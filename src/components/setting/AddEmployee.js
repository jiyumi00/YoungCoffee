import React, { Component } from 'react';
import { ScrollView, StyleSheet, View, Alert } from 'react-native';

// Constants
import { THEME } from '../../constants/theme';

import dayjs from 'dayjs';

// Components
import Insets from '../../components/common/Insets';
import ToggleButton from '../../components/common/ToggleButton';
import Switch from '../../components/common/Switch';
import InputBox from '../../components/common/InputBox';
import SettingHeader from '../../components/setting/SettingHeader';
import Input from '../../components/common/Input';
import SubmitButton from '../../components/common/SubmitButton';

import DateButton from '../../components/common/DateButton';
import DatePicker from '../../components/common/DatePicker';
import Constant from '../../utils/constants';
import WebServiceManager from '../../utils/webservice_manager';

// Utils
import { numberKeyboardType, onUpdateNumbersOnly } from '../../utils/keyboard';




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

        this.userID=0;
                
        this.state = {
            employeeType: 'partTime',
            isFullTime: false,
            confirmValues: true,
            bonusToggle: false,
            tiredToggle: false,

            date: dayjs(),
            isDatePickerVisible: false,

            name:'',
            cNumber:'',
            tel:'',
            pay:0
        }
    }
    //date하나밖에 없기때문에 바로 this.state.date에다가 넣음
    onSelectedListener = (value) => {
        this.setState({ date: value });
        console.log('case date = ', this.state.date);
    }

    bonusToggleClicked() {
        this.setState({ bonusToggle: !this.state.bonusToggle });
    }

    tiredToggleClicked() {
        this.setState({ tiredToggle: !this.state.tiredToggle });
    }

    registerButtonClicked() {
        console.log('아르바이트 직원을 등록합니다.');
        Constant.getUserInfo().then((response)=> {
            this.userID=response.userID;
            this.callAddDailyEmployeeAPI().then((response)=> {
                console.log('아르바이트 직원등록 완료 후 메시지 = ', response);
                if(response.success==1)
                    Alert.alert("직원등록","직원등록이 성공적으로 되었습니다");
                else
                    Alert.alert("직원등록","직원등록에 실패하였습니다");
                this.props.navigation.goBack();
            });
        });
    }

    onCloseModal = () => {
        this.setState({ isDatePickerVisible: false })
    }

    //입사일 클릭시
    openDatePickerModal = () => {
        this.setState({isDatePickerVisible: true })
    }

    employeeKindClicked=(kind)=> {
        if(kind=='partTime')
            this.setState({employeeType:kind, isFullTime:false})
        else {
            Alert.alert("직원등록","현재는 정직원 기능을 사용할 수 없습니다");
            this.setState({employeeType:'partTime', isFullTime:false});
        }
    }

    //{"userID":2,"name":"이순신","tel":"01077778888","cNumber":"0112313845678","startDate":"2023-07-01","pay":9620}
    async callAddDailyEmployeeAPI() {
        let manager = new WebServiceManager(Constant.serviceURL+"/AddDailyEmployee","post");

        const formData={
            userID:this.userID,
            name:this.state.name,
            tel:this.state.tel,
            cNumber:this.state.cNumber,
            startDate:dayjs(this.state.date).format("YYYY-MM-DD"),
            pay:parseInt(this.state.pay)};

        console.log('직원 등록 form Data = ',formData);
            
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
                                        onPress={() => this.employeeKindClicked('partTime') }
                                        label='아르바이트'
                                        active={!this.state.isFullTime}
                                        buttonStyle={styles.switch} />
                                    <Switch
                                        onPress={() => this.employeeKindClicked('fullTime')}
                                        label='정직원'
                                        active={this.state.isFullTime}
                                        buttonStyle={styles.switch} />
                                </View>
                            }
                        />

                        <InputBox
                            label='이름'
                            input={<Input placeholder='이름을 입력해주세요.' 
                                        value={this.state.name}
                                        onChangeText={(text) => this.setState({name:text})}/>} />
                        <InputBox
                            label='주민등록번호'
                                input={<Input placeholder='주민등록번호를 입력해주세요.' 
                                        value={this.state.cNumber}
                                        onChangeText={(text) => this.setState({cNumber:text})}
                                        keyboardType={numberKeyboardType}/>} />
                        <InputBox
                            label='연락처'
                            input={<Input placeholder='연락처를 입력해주세요.' 
                                        value={this.state.tel}
                                        onChangeText={(text) => this.setState({tel:text})}
                                        keyboardType={numberKeyboardType}/>} />
                        <InputBox
                            label='입사일'
                            input={
                                <DateButton
                                    key={this.state.date}
                                    defaultDate={this.state.date}
                                    onPress={() => this.openDatePickerModal()}
                                />
                            } />

                        <InputBox
                            label={this.state.isFullTime ? '연봉' : '시급'}
                            input={<Input
                                    placeholder={`${this.state.isFullTime ? '연봉' : '시급'
                                        }을 입력해주세요.`} 
                                    value={this.state.pay.toString()}
                                    onChangeText={(text) => this.setState({pay:text})}
                                    keyboardType={numberKeyboardType}/>
                            } />

                        {/* 풀타임일 경우에만 상여금, 퇴직금 입력 받음 */}
                        {this.state.isFullTime && (
                            <>
                                <InputBox
                                    label='상여금 포함 여부'
                                    input={
                                        <ToggleButton
                                            active={this.state.bonusToggle}
                                            onPress={() => this.bonusToggleClicked()} />
                                    }
                                    viewStyle={styles.toggleBox} />
                                <InputBox
                                    label='퇴직금 포함 여부'
                                    input={
                                        <ToggleButton
                                            active={this.state.tiredToggle}
                                            onPress={() => this.tiredToggleClicked()} />
                                    }
                                    viewStyle={styles.toggleBox} />
                            </>
                        )}
                    </ScrollView>

                    {/* Submit Button */}
                    <SubmitButton
                        label='등록하기'
                        disabled={!this.state.confirmValues}
                        onSubmit={() => this.registerButtonClicked()}
                    />

                    {this.state.isDatePickerVisible && (
                        <DatePicker
                            defaultDate={new Date(this.state.date)}
                            onSelectedListener={(value) => this.onSelectedListener(value)}
                            mode="date"
                            onClose={this.onCloseModal}
                        />
                    )}
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

