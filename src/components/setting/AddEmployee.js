import React, { Component } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

// Constants
import { THEME } from '../../constants/theme';

// Components
import Insets from '../../components/common/Insets';
import ToggleButton from '../../components/common/ToggleButton';
import Switch from '../../components/common/Switch';
import InputBox from '../../components/common/InputBox';
import SettingHeader from '../../components/setting/SettingHeader';
import Input from '../../components/common/Input';
import SubmitButton from '../../components/common/SubmitButton';

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
    toggleBox: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 22,
    },
    switchList: {
        marginTop: 8,
        flexDirection: 'row',
        alignItems: 'center',
    },
    switch: {
        flex: 1,
    },
    input: {
        paddingHorizontal: 14,
        paddingVertical: 6,
        backgroundColor: THEME.COLOR.WHITE_COLOR,
        borderColor: THEME.COLOR.SILVER,
        borderWidth: 1,
    },
});

/**
 * @title 직원 등록 스크린
 * @description
 * - 정직원, 아르바이트 구분하여 input 표시
 * - params로 직원 구분 정보를 받아온 후 기본 값 설정
 * - Type Switch가 변경될 때 마다 입력된 값 비워지게 설정
 * @returns
 */

export default class AddEmployee extends Component {

    constructor(props) {
        super(props);
        this.state={
            employeeType:'partTime',
            isFullTime:false,
            confirmValues:true,
            bonusToggle:false,
            tiredToggle:false
        }
    }

    bonusToggleClicked() {
        this.setState({bonusToggle:!this.state.bonusToggle});
    }

    tiredToggleClicked(){
        this.setState({tiredToggle:!this.state.tiredToggle});
    }

    registerButtonClicked() {
        console.log('register button click');
    }

    render() {
        return (
            <View style={styles.container}>
                <Insets>
                    {/* Header */}
                    <SettingHeader title='직원 등록하기' />
    
                    {/* Form */}
                    <ScrollView style={styles.form}>
                        <InputBox
                            label='직원 타입 선택'
                            input={
                                <View style={styles.switchList}>
                                    <Switch
                                        onPress={()=>this.setState({employeeType:'partTime',isFullTime:false})}
                                        label='아르바이트'
                                        active={!this.state.isFullTime}
                                        buttonStyle={styles.switch}/>
                                    <Switch
                                        onPress={()=>this.setState({employeeType:'fullTime',isFullTime:true})}
                                        label='정직원'
                                        active={this.state.isFullTime}
                                        buttonStyle={styles.switch}/>
                                </View>
                            }
                        />
    
                        <InputBox
                            label='이름'
                            input={<Input placeholder='이름을 입력해주세요.' />}/>
                        <InputBox
                            label='주민등록번호'
                            input={
                                <Input placeholder='주민등록번호를 입력해주세요.' />}/>
                        <InputBox
                            label='연락처'
                            input={<Input placeholder='연락처를 입력해주세요.' />}/>
                        <InputBox
                            label='입사일'
                            input={<Input placeholder='입사일을 선택해주세요.' />}/>
    
                        <InputBox
                            label={this.state.isFullTime ? '연봉' : '시급'}
                            input={
                                <Input
                                    placeholder={`${
                                        this.state.isFullTime ? '연봉' : '시급'
                                    }을 입력해주세요.`}/>
                            }/>
    
                        {/* 풀타임일 경우에만 상여금, 퇴직금 입력 받음 */}
                        {this.state.isFullTime && (
                            <>
                                <InputBox
                                    label='상여금 포함 여부'
                                    input={
                                        <ToggleButton
                                            active={this.state.bonusToggle}
                                            onPress={()=>this.bonusToggleClicked()}/>
                                    }
                                    viewStyle={styles.toggleBox}/>    
                                <InputBox
                                    label='퇴직금 포함 여부'
                                    input={
                                        <ToggleButton
                                            active={this.state.tiredToggle}
                                            onPress={()=>this.tiredToggleClicked()}/>
                                    }
                                    viewStyle={styles.toggleBox}/>
                            </>
                        )}
                    </ScrollView>
    
                    {/* Submit Button */}
                    <SubmitButton
                        label='등록하기'
                        disabled={!this.state.confirmValues}
                        onSubmit={()=>this.registerButtonClicked()}
                    />
                </Insets>
            </View>
        );
    }
}

