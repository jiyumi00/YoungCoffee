import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
  StatusBar,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Constants
import {THEME} from '../../constants/theme';

// Components
import Insets from '../../components/common/Insets';
import SubmitButton from '../../components/common/SubmitButton';
import Image from '../../components/common/Image';
import InputBox from '../../components/common/InputBox';
import Input from '../../components/common/Input';
import Text from '../../components/common/Text';
import WebServiceManager from '../../utils/webservice_manager';
import Constant from '../../utils/constants';

// Utils
import {keyboardBehavior} from '../../utils/keyboard';
import {numberKeyboardType} from '../../utils/keyboard';
import {HandleSpaceRemoval} from '../../utils/inputSpace';
import {SafeAreaView} from 'react-native-safe-area-context';

// Images
const LongLogo = require('../../assets/images/long_logo/long_logo.png');

/**
 * @title 로그인 스크린
 * @returns
 * @todo
 * - 로그인 API 요청
 * - (최초 로그인 X) isLoggedIn 상태 업데이트
 * - (최초 로그인 O)일 경우 params에 user 정보 넘겨주기
 * - State Cleanup
 */

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: '',
      password: '',
      isValidForm: false,
    };
  }

  componentDidMount() {
    //console.log('componentDidMount');
    Constant.getUserInfo().then(userInfo => {
      if (userInfo.userID != 0) this.props.navigation.navigate('MainTab');
    });
  }

  //폼 유효성 검사
  onValidForm = value => {
    this.setState(value, () => {
      let isValidForm = true;
      if (this.state.id.trim().length < 10) isValidForm = false;
      if (this.state.password.trim().length < 1) isValidForm = false;
      this.setState({isValidForm: isValidForm});
    });
  };

 
  //MainTab
  onSubmit = () => {
    //console.log('로그인버튼 클릭')
    this.callLoginAPI().then(response => {
      //console.log('userInfo=', response);
      if (response.userID == 0) {
        Alert.alert('아이디 또는 비밀번호를 확인해주세요', '');
        // 실패했을 경우에는 패스워드만 비워주기
        this.setState({
          password: '',
          isValidForm: false,
        });
      } else if (response.userID != 0 && response.firstLogin == 0) {
        AsyncStorage.setItem('userInfo', JSON.stringify(response));
        this.setState({
          password: '',
          id: '',
          isValidForm: false,
        });
        this.props.navigation.navigate('MainTab');
      } else if (response.userID != 0 && response.firstLogin == 1) {
        // 처음 로그인 시 id는 그대로 두고 passwd만 비워두기
        this.setState({
          password: '',
          isValidForm: false,
        });
        this.props.navigation.navigate('FirstLogin', {
          userID: response.userID,
          cmpNo: response.cmpNo,
          cmpName: response.cmpName,
          cmpTel: response.cmpTel,
        });
      }
    });
  };

  // 로그인 요청 API
  async callLoginAPI() {
    let manager = new WebServiceManager(Constant.serviceURL + '/Login', 'post');
    const formData = {
      id: this.state.id.replace('-', ''),
      passwd: this.state.password,
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
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          style={styles.container}
          behavior={keyboardBehavior}>
          <StatusBar
            translucent
            backgroundColor="transparent"
            barStyle="dark-content"
          />

          {/* Header */}
          <View style={styles.header}>
            <Image
              style={styles.longLogo}
              source={LongLogo}
              resizeMode="center"
            />

            <View style={styles.subTextView}>
              <Text style={styles.subText}>
                비밀번호를 잊어버렸을 경우 {'\n'}관리자에게 문의해주세요.
              </Text>
            </View>
          </View>

          {/* Form */}
          <View style={styles.form}>
            {/* 아이디 */}
            <InputBox
              label="아이디"
              input={
                <Input
                  placeholder="사업자등록번호 10자리. - 없이"
                  onChangeText={value => this.onValidForm({id: value})}
                  value={Constant.transformCmpNo(this.state.id)}
                  returnKeyType="next"
                  keyboardType={numberKeyboardType}
                  {...ID_INPUT}
                />
              }
            />

            {/* 비밀번호 */}
            <InputBox
              label="비밀번호"
              input={
                <Input
                  placeholder="비밀번호를 입력해주세요. 4글자 이상"
                  onChangeText={value => this.onValidForm({password: value})}
                  value={this.state.password}
                  secureTextEntry={true}
                  {...PASSWORD_INPUT}
                />
              }
            />
          </View>

          {/* Submit Button */}
          <SubmitButton
            label="로그인"
            onSubmit={this.onSubmit}
            disabled={!this.state.isValidForm}
          />
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  longLogo: {
    width: 260,
    height: 22,
  },
  subTextView: {
    marginTop: 15,
  },
  subText: {
    fontSize: 16,
    fontWeight: '300',
    lineHeight: 23,
    textAlign: 'center',
    color: THEME.COLOR.GRAY_COLOR,
  },
  form: {
    flex: 1,
    paddingHorizontal: 30,
  },
});

export const ID_INPUT = {
  placeholder: '아이디',
  keyboardType: 'email-address',
  maxLength: 16,
  autoCapitalize: 'none',
  blurOnSubmit: false,
};

export const PASSWORD_INPUT = {
  keyboardType: 'default',
  maxLength: 16,
  textContentType: 'password',
  autoComplete: 'password',
  autoCapitalize: 'none',
  secureTextEntry: true,
  blurOnSubmit: false,
};
