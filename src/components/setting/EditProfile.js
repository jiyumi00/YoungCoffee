import React, {Component} from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

// Components
import SettingHeader from '../../components/setting/SettingHeader';
import InputBox from '../../components/common/InputBox';
import Insets from '../../components/common/Insets';
import Input from '../../components/common/Input';
import Text from '../../components/common/Text';
import SubmitButton from '../../components/common/SubmitButton';
import Constant from '../../utils/constants';
import WebServiceManager from '../../utils/webservice_manager';

// Constants
import {THEME} from '../../constants/theme';
import {PASSWORD_INPUT} from '../../constants/input';
import {SafeAreaView} from 'react-native-safe-area-context';
import {keyboardBehavior} from '../../utils/keyboard';

export default class EditProfile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userInfo: {},
      previousPassword: '',
      password: null,
      passwordConfirm: null,
    };
  }

  componentDidMount() {
    Constant.getUserInfo().then(userInfo => {
      this.setState({userInfo: userInfo});
    });
  }

  onSubmit = () => {
    //console.log('data',this.state.previousPassword,this.state.password,this.state.passwordConfirm);
    if (this.state.password != this.state.passwordConfirm) {
      Alert.alert('입력오류', '새로운 패스워드가 일치하지 않습니다');
    } else {
      this.callModifyUserAPI().then(response => {
        Alert.alert('정보수정', response.message);
        if (response.success > 0) 
          this.props.navigation.goBack();
      });
    }
  }

  async callModifyUserAPI() {
    let manager = new WebServiceManager(Constant.serviceURL + '/ModifyUser','post');
    const formData = {
      userID: this.state.userInfo.userID,
      cmpNo: this.state.userInfo.cmpNo,
      passwd: this.state.previousPassword,
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
    const {cmpName, cmpNo, cmpAddress, repName} = this.state.userInfo;
    let displayedCmpNo = '';
    if (cmpNo != undefined) displayedCmpNo = Constant.transformCmpNo(cmpNo);

    //console.log('랜더링 in EditProfile = ', this.state.userInfo);
    return (
      <KeyboardAvoidingView behavior={keyboardBehavior} style={{flex: 1}}>
        <SafeAreaView edges={['top']} style={styles.container}>
          <SettingHeader title="내 정보 관리" />
          <ScrollView style={styles.form}>
            <InputBox
              label="가맹점명"
              input={
                <View style={styles.value}>
                  <Text style={styles.valueText} fontWeight={500}>
                    {cmpName}
                  </Text>
                </View>
              }
            />

            <InputBox
              label="사업자 등록번호"
              input={
                <View style={styles.value}>
                  <Text style={styles.valueText} fontWeight={500}>
                    {displayedCmpNo}
                  </Text>
                </View>
              }
            />

            <InputBox
              label="대표자"
              input={
                <View style={styles.value}>
                  <Text style={styles.valueText} fontWeight={500}>
                    {repName}
                  </Text>
                </View>
              }
            />

            <InputBox
              label="사업자 소재지"
              input={
                <View style={styles.value}>
                  <Text style={styles.valueText} fontWeight={500}>
                    {cmpAddress}
                  </Text>
                </View>
              }
            />

            <InputBox
              label="기존 비밀번호"
              input={
                <Input
                  {...PASSWORD_INPUT}
                  placeholder="기존 비밀번호를 입력해주세요."
                  value={this.state.previousPassword}
                  onChangeText={value => {
                    this.setState({previousPassword: value});
                  }}
                />
              }
            />

            <InputBox
              label="변경 비밀번호"
              input={
                <Input
                  {...PASSWORD_INPUT}
                  placeholder="변경된 비밀번호를 입력해주세요."
                  value={this.state.password}
                  onChangeText={value => {
                    this.setState({password: value});
                  }}
                />
              }
            />

            <InputBox
              label="변경 비밀번호 확인"
              input={
                <Input
                  {...PASSWORD_INPUT}
                  placeholder="비밀번호를 다시 한번 입력해주세요."
                  value={this.state.passwordConfirm}
                  onChangeText={value =>
                    this.setState({passwordConfirm: value})
                  }
                />
              }
            />
          </ScrollView>
        </SafeAreaView>
        <SubmitButton
          bottomInset={false}
          disabled={
            !this.state.password ||
            !this.state.passwordConfirm ||
            !this.state.previousPassword
          }
          onSubmit={this.onSubmit}
          label="수정하기"
        />
      </KeyboardAvoidingView>
    );
  }
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.COLOR.WHITE_COLOR,
  },
  form: {
    paddingHorizontal: 25,
  },
  input: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    backgroundColor: THEME.COLOR.WHITE_COLOR,
    borderColor: THEME.COLOR.SILVER,
    borderWidth: 1,
  },
  value: {},
  valueText: {
    fontSize: 16,
    fontWeight: '500',
    color: THEME.COLOR.BLACK_COLOR,
  },
  test: {
    borderColor: 'red',
  },
});
