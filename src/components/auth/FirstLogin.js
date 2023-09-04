import React, {Component} from 'react';
import {View, StyleSheet, ScrollView, Alert} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

// Constants
import WebServiceManager from '../../utils/webservice_manager';
import Constant from '../../utils/constants';
import {THEME} from '../../constants/theme';
import {PASSWORD_INPUT} from '../../constants/input';

// Components
import SubmitButton from '../../components/common/SubmitButton';
import InputBox from '../../components/common/InputBox';
import Logo from '../../components/common/Logo';
import Input from '../../components/common/Input';
import Text from '../../components/common/Text';

/**
 * @title (최초 로그인) 비밀번호 설정 스크린
 * @returns
 * @todo
 * - 비밀번호 업데이트 API 요청
 * - isLoggedIn 상태 업데이트
 * - State Cleanup
 */
export default class FirstLogin extends Component {
  constructor(props) {
    super(props);

    this.userID = this.props.route.params.userID;
    this.cmpNo = this.props.route.params.cmpNo;
    this.cmpName = this.props.route.params.cmpName;
    this.cmpTel = this.props.route.params.cmpTel;

    this.state = {
      password: '',
      passwordConfirm: '',
      isValidForm: false,
    };
  }

  onValidForm = value => {
    this.setState(value, () => {
      let isValidForm = true;
      if (this.state.password.trim().length < 4) 
        isValidForm = false;
      if (this.state.passwordConfirm.trim().length < 4) 
        isValidForm = false;
      if (this.state.password != this.state.passwordConfirm)
        isValidForm = false;
      this.setState({isValidForm: isValidForm});
    });
  };

  onSubmit = () => {
    this.callModifyUserAPI().then(response => {
      //console.log('modify user response = ', response);
      Alert.alert('정보수정', response.message);
      if (response.success > 0) 
        this.props.navigation.navigate('SignIn');
    });
  };

  async callModifyUserAPI() {
    let manager = new WebServiceManager(Constant.serviceURL + '/ModifyUser','post');
    const formData = {
      userID: this.userID,
      cmpNo: this.cmpNo,
      passwd: this.cmpTel,
      newPasswd: this.state.password,
    };

    manager.addFormData('data', formData);
    let response = await manager.start();
    if (response.ok) 
      return response.json();
    else 
      Promise.reject(response);
  }

  render() {
    return (
      <SafeAreaView edges={['top']} style={styles.container}>
        {/* Insets */}
        <ScrollView contentContainerStyle={{flexGrow: 1}}>
          {/* Header */}
          <View style={styles.header}>
            {/* Logo */}
            <Logo />

            {/* Header Text View */}
            <View style={styles.headerTextView}>
              <Text style={styles.headerMainText}>
                사용할 비밀번호를 입력해주세요.
              </Text>

              <Text style={styles.headerSubText}>
                {this.cmpName}님의 최초 로그인입니다.
              </Text>

              <Text style={styles.headerSubText}>
                비밀번호를 변경하셔야 앱을 이용할 수 있습니다.
              </Text>
            </View>
          </View>

          {/* Form */}
          <View style={styles.form}>
            {/* ID */}
            <InputBox
              label="아이디"
              input={<Input value={this.cmpNo} editable={false} />}
            />

            {/* Password */}
            <InputBox
              label="사용할 비밀번호"
              input={
                <Input
                  placeholder="사용할 비밀번호를 입력해주세요."
                  value={this.state.password}
                  onChangeText={value => this.onValidForm({password: value})}
                  {...PASSWORD_INPUT}
                />
              }
            />

            {/* Password Confirm */}
            <InputBox
              label="사용할 비밀번호 확인"
              input={
                <Input
                  placeholder="비밀번호를 다시 한번 입력해주세요."
                  value={this.state.passwordConfirm}
                  onChangeText={value =>
                    this.onValidForm({passwordConfirm: value})
                  }
                  {...PASSWORD_INPUT}
                />
              }
            />
          </View>
        </ScrollView>

        {/* Submit Button */}
        <SubmitButton
          label="비밀번호 변경 후 재 로그인"
          onSubmit={this.onSubmit}
          disabled={!this.state.isValidForm}
        />
      </SafeAreaView>
    );
  }
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.COLOR.WHITE_COLOR,
  },
  header: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    ...THEME.CONTENTS_PADDING,
  },

  headerTextView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerMainText: {
    textAlign: 'center',
    fontSize: 21,
    fontWeight: '600',
    color: THEME.COLOR.MAIN_COLOR,
    marginBottom: 10,
  },
  headerSubText: {
    textAlign: 'center',
    fontSize: 15,
    lineHeight: 23,
    fontWeight: '400',
    color: THEME.COLOR.GRAY_COLOR,
  },
  form: {
    flex: 1,
    ...THEME.CONTENTS_PADDING,
  },
});
