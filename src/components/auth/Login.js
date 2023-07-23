import React, { Component, useState } from 'react';
import { View, StyleSheet, KeyboardAvoidingView, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Constants
import { THEME } from '../../constants/theme';

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
import { keyboardBehavior } from '../../utils/keyboard';
import { numberKeyboardType } from '../../utils/keyboard';
import { HandleSpaceRemoval } from '../../utils/inputSpace';

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

        this.state={
            id:'',
            password:'',
            isValidForm:false
        }
    }

    //폼 유효성 검사
    onValidForm=(value)=> {
        this.setState(value,()=> {
            let isValidForm = true;
            if(this.state.id.trim().length<10)
                isValidForm=false;
            if(this.state.password.trim().length<4)
                isValidForm=false;
            this.setState({isValidForm:isValidForm});
        });
    }

    //로그인 성공시 홈화면으로 가야하는데 MainTab으로 이동하면 에러 발생
    //MainTab
    onSubmit=()=> {
        this.callLoginAPI().then((response)=> {
            console.log('userInfo=',response);
            if(response.userID==0) {
                Alert.alert('아이디 또는 비밀번호를 확인해주세요', '',);
                return;
            }
            else if(response.userID!=0) {
                AsyncStorage.setItem('userInfo',JSON.stringify(response));
                //this.props.navigation.navigate('AddEmployee');
                this.props.navigation.navigate('MainTab',{screen:'Home'});
            }
            //최초로그인일 경우 패스워드 변경화면으로 이동(이동하고 패스워드 수정후의 액션 문제때문에 다음으로 미룸)
            /*
            if(response.userID!=0 && response.firstLogin==1)
                this.props.navigation.navigate("FirstLogin",{cmpNo:response.cmpNo,cmpName:response.cmpName});
            */
        
        })
    }

    async callLoginAPI() {
        let manager = new WebServiceManager(Constant.serviceURL+"/Login","post");
        const formData = {id:this.state.id,passwd:this.state.password};
        manager.addFormData("data",formData);
        let response = await manager.start();
        if (response.ok)
            return response.json();
        else
            Promise.reject(response);
    }

    render() {
        return (
            <KeyboardAvoidingView
                style={styles.container}
                behavior={keyboardBehavior}>
                {/* Insets */}
                <Insets>
                    {/* Header */}
                    <View style={styles.header}>
                        <Image
                            style={styles.longLogo}
                            source={LongLogo}
                            resizeMode='center'
                        />
                        <View style={styles.subTextView}>
                            <Text style={styles.subText}>
                                비밀번호를 잊어버렸을 경우 {'\n'}관리자에게
                                문의해주세요.
                            </Text>
                        </View>
                    </View>
    
                    {/* Form */}
                    <View style={styles.form}>
                        {/* 아이디 */}
                        <InputBox
                            label='아이디'
                            input={
                                <Input
                                    placeholder='사업자등록번호 10자리.'
                                    onChangeText={(value)=>this.onValidForm({id:value})}
                                    value={this.state.id}
                                    returnKeyType="next"
                                    keyboardType={numberKeyboardType}
                                    {...ID_INPUT}
                                />
                            }
                        />
    
                        {/* 비밀번호 */}
                        <InputBox
                            label='비밀번호'
                            input={
                                <Input
                                    placeholder='비밀번호를 입력해주세요. 4글자 이상'
                                    onChangeText={(value)=>this.onValidForm({password:value})}
                                    value={this.state.password}
                                    secureTextEntry={true}
                                    {...PASSWORD_INPUT}
                                />
                            }
                        />
                    </View>
    
                    {/* Submit Button */}
                    <View style={styles.submitButtonView}>
                        <SubmitButton
                            label='로그인'
                            onSubmit={this.onSubmit}
                            disabled={!this.state.isValidForm}
                        />
                    </View>
                </Insets>
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
    header: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    longLogo: {
        width: 260,
        height: 24,
    },
    subTextView: {
        marginTop: 10,
    },
    subText: {
        fontSize: 15,
        fontWeight: '300',
        lineHeight: 22,
        textAlign: 'center',
        color: THEME.COLOR.GRAY_COLOR,
    },
    form: {
        flex: 1,
        ...THEME.CONTENTS_PADDING,
    },
    submitButtonView: {
        ...THEME.CONTENTS_PADDING,
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
