import React, { Component } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

// Components
import SettingHeader from '../../components/setting/SettingHeader';
import InputBox from '../../components/common/InputBox';
import Insets from '../../components/common/Insets';
import Input from '../../components/common/Input';
import Text from '../../components/common/Text';
import SubmitButton from '../../components/common/SubmitButton';

// Constants
import { THEME } from '../../constants/theme';
import { PASSWORD_INPUT } from '../../constants/input';

// Styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: THEME.COLOR.WHITE_COLOR,
    },
    form: {
        flexGrow: 1,
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
});

export default class EditProfileScreen extends Component{

    constructor(props){
        super(props);
        this.state={
            previousPassword:'',
            password:null,
            passwordConfirm:null,
        }
    }
    onSubmit=()=>{
        console.log('data',this.state.previousPassword,this.state.password,this.state.passwordConfirm)
    }
    render(){
        return(
             <View style={styles.container}>
            <Insets>
                <SettingHeader title='내 정보 관리' />
                <ScrollView style={styles.form}>
                    <InputBox
                        label='법인명'
                        input={
                            <View style={styles.value}>
                                <Text style={styles.valueText}>
                                    영커피 센텀점
                                </Text>
                            </View>
                        }
                    />

                    <InputBox
                        label='사업자 등록번호'
                        input={
                            <View style={styles.value}>
                                <Text style={styles.valueText}>
                                    123-45-67890
                                </Text>
                            </View>
                        }
                    />

                    <InputBox
                        label='대표자'
                        input={
                            <View style={styles.value}>
                                <Text style={styles.valueText}>홍길동</Text>
                            </View>
                        }
                    />

                    <InputBox
                        label='사업자 소재지'
                        input={
                            <View style={styles.value}>
                                <Text style={styles.valueText}>
                                    부산광역시 해운대구 우동 123-4, 1층
                                </Text>
                            </View>
                        }
                    />

                    <InputBox
                        label='아이디'
                        input={
                            <View style={styles.value}>
                                <Text style={styles.valueText}>abcd1234</Text>
                            </View>
                        }
                    />

                    <InputBox
                        label='기존 비밀번호'
                        input={
                            <Input
                                {...PASSWORD_INPUT}
                                value={this.state.previousPassword}
                                onChangeText={(value)=>{this.setState({previousPassword:value})}}
                            />
                        }
                    />

                    <InputBox
                        label='변경 비밀번호'
                        input={
                            <Input
                                {...PASSWORD_INPUT}
                                value={this.state.password}
                                onChangeText={(value)=>{this.setState({password:value})}}
                            />
                        }
                    />

                    <InputBox
                        label='변경 비밀번호 확인'
                        input={
                            <Input
                                {...PASSWORD_INPUT}
                                value={this.state.passwordConfirm}
                                onChangeText={(value)=>this.setState({passwordConfirm:value})}
                            />
                        }
                    />
                </ScrollView>

                <SubmitButton
                    disabled={ !this.state.password || !this.state.passwordConfirm || !this.state.previousPassword}
                    onSubmit={this.onSubmit}
                    label='수정하기'
                />
            </Insets>
        </View>
        )
    }
}
