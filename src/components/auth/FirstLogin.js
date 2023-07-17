import React, { Component, useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';

// Constants
import WebServiceManager from '../../utils/webservice_manager';
import Constant from '../../utils/constants';
import { THEME } from '../../constants/theme';
import { PASSWORD_INPUT } from '../../constants/input';

// Components
import Insets from '../../components/common/Insets';
import SubmitButton from '../../components/common/SubmitButton';
import InputBox from '../../components/common/InputBox';
import Logo from '../../components/common/Logo';
import Input from '../../components/common/Input';
import { HandleSpaceRemoval } from '../../utils/inputSpace';
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

        this.cmpNo=this.props.route.params.cmpNo;
        this.cmpName=this.props.route.params.cmpName;

        this.state={
            password:'',
            passwordConfirm:'',
            isValidForm:false
        }
    }

    onValidForm=(value)=> {
        this.setState(value,()=> {
            console.log('value = ',this.state.password,this.state.passwordConfirm);
            let isValidForm=true;
            if(this.state.password.trim().length<4)
                isValidForm=false;
            if(this.state.passwordConfirm.trim().length<4)
                isValidForm=false;
            if(this.state.password!=this.state.passwordConfirm)
                isValidForm=false;
            this.setState({isValidForm:isValidForm});
        });
    }

    onSubmit=()=> {
        console.log('passwd change clicked');
        this.callModifyUserAPI().then((response)=> {
            console.log('modify user response = ',response);
        });
    }

    async callModifyUserAPI() {
        let manager = new WebServiceManager(Constant.serviceURL+"/ModifyUser","post");
        const formData = {id:this.cmpNo,passwd:this.state.password};
        manager.addFormData("data",formData);
        let response = await manager.start();
        if (response.ok)
            return response.json();
        else
            Promise.reject(response);
    }

    render() {
        return (
            <View style={styles.container}>
                {/* Insets */}
                <Insets>
                    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
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
                            </View>
                        </View>
    
                        {/* Form */}
                        <View style={styles.form}>
                            {/* ID */}
                            <InputBox
                                label='아이디'
                                input={
                                    <Input
                                        value={this.cmpNo}
                                        editable={false}
                                    />
                                }
                            />
    
                            {/* Password */}
                            <InputBox
                                label='사용할 비밀번호'
                                input={
                                    <Input
                                        placeholder='사용할 비밀번호를 입력해주세요.'
                                        value={this.state.password}
                                        onChangeText={(value)=> this.onValidForm({password:value})}
                                        {...PASSWORD_INPUT}
                                    />
                                }
                            />
    
                            {/* Password Confirm */}
                            <InputBox
                                label='사용할 비밀번호 확인'
                                input={
                                    <Input
                                        placeholder='비밀번호를 다시 한번 입력해주세요.'
                                        value={this.state.passwordConfirm}
                                        onChangeText={(value)=> this.onValidForm({passwordConfirm:value})}
                                        {...PASSWORD_INPUT}
                                    />
                                }
                            />
                        </View>
                    </ScrollView>
    
                    {/* Submit Button */}
                    <SubmitButton
                        label='비밀번호 변경'
                        onSubmit={this.onSubmit}
                        disabled={!this.state.isValidForm}
                    />
                </Insets>
            </View>
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
    },
    headerSubText: {
        marginTop: 6,
        textAlign: 'center',
        fontSize: 15,
        fontWeight: '400',
        color: THEME.COLOR.GRAY_COLOR,
    },
    form: {
        flex: 1,
        ...THEME.CONTENTS_PADDING,
    },
});
