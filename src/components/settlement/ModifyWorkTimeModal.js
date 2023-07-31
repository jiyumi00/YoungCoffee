import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    KeyboardAvoidingView,
    Pressable,
    TextInput,
    Alert,
} from 'react-native';
import dayjs from 'dayjs';

// Components
import ModalContainer from '../../components/modal/ModalContainer';
import Image from '../../components/common/Image';
import DatePicker from '../../components/common/DatePicker';
import Text from '../../components/common/Text';
import InputBox from '../common/InputBox';
import Input from '../common/Input';
import TimeButton from '../common/TimeButton';
import Constant from '../../utils/constants';
import WebServiceManager from '../../utils/webservice_manager';

// Constants
import { THEME } from '../../constants/theme';

// Utils
import { numberKeyboardType, onUpdateNumbersOnly } from '../../utils/keyboard';
import { amountFormat } from '../../utils/AmountFormat';

// Images
const TimeIcon = require('../../assets/images/time_icon/time_icon.png');



/**
 * @title 정산 급여 수정 모달
 * @returns
 */

export default class ModifyWorkTimeModal extends Component {
    constructor(props) {
        super(props);

        this.data=this.props.route.params.data;
        console.log('item data in  아르바이트 시간 수정 모달 = ',this.data);
        const [startHour,startMinute] = this.data.start.split(":");
        const [endHour,endMinute] = this.data.end.split(":"); 

        this.startDate = dayjs(new Date(this.data.startDate));
        this.endDate = dayjs(this.data.startDate);

        this.startDate=this.startDate.set("hour",startHour);
        this.startDate=this.startDate.set("minute",startMinute);
        this.endDate=this.endDate.set("hour",endHour);
        this.endDate=this.endDate.set("minute",endMinute);

        console.log('modify start date = ',this.startDate);
        console.log('modify end date = ',this.endDate);

        this.state={
            startDate:this.startDate,
            startTime:this.startDate,
            endTime:this.endDate,
            pay:this.data.pay,
            displayedPay:amountFormat(this.data.pay),
            selectedTime:'',
            isDatePickerVisible:false
        }
    }

    onClose = () => {
        this.props.navigation.goBack();
    };

 
    submit = () => {
        if(dayjs(this.state.startTime).format("HH-mm")>=dayjs(this.state.endTime).format("HH-mm") || parseInt(this.state.pay)<=0 || this.state.pay.toString().length==0 || isNaN(this.state.pay))
            Alert.alert("입력오류","시간 또는 금액이 잘못되었습니다");
        else {
            this.callModifyWorkedTimeAPI().then((response)=> {
                Alert.alert('근무수정',response.message);
            })
            this.onClose();
        }        
    };

    // DatePicker 닫기
    onCloseDatePicker = () => {
        this.setState({isDatePickerVisible:false});
    } 

    onOpenDatePicker=(value)=> {
        this.setState({selectedTime:value,isDatePickerVisible:true});
    }

    onSelectedListener=(value)=> {
        switch (this.state.selectedTime) {
            case 'start':
                this.setState({startTime:value});
                break;
            case 'end':
                this.setState({endTime:value});
                break;
        }
    }    

    onPayChanged=(value)=> {
        this.setState({pay:parseInt(value),displayedPay:value});
    }

    //금액의 숫자를 , 를 넣은 문자열로 변환
    numberToString=()=> {
        this.setState({displayedPay:amountFormat(this.state.pay)});
    }

    //,가 있는 금액을 숫자로 변환
    stringToNumber=()=> {
        this.setState({displayedPay:this.state.pay});
    }


    //{"id":28,"startDate":"2023-07-02","start":"10:00","end":"17:00","pay":9620}
    async callModifyWorkedTimeAPI() {
        let manager = new WebServiceManager(Constant.serviceURL+"/ModifyWorkedTime","post");

        const formData={
            id:this.data.id,
            startDate:dayjs(this.data.startDate).format("YYYY-MM-DD"),
            start:dayjs(this.state.startTime).format("HH:mm"),
            end:dayjs(this.state.endTime).format("HH:mm"),
            pay:parseInt(this.state.pay)};
            
        manager.addFormData("data",formData);
        console.log('final form data = ',formData);
        
        let response = await manager.start();
        if (response.ok)
            return response.json();
        else
            Promise.reject(response);
    }



    render() {
        let displayedTime=null;
        if(this.state.selectedTime=='start')
            displayedTime=this.state.startTime;
        else
            displayedTime=this.state.endTime;

        return (
            <>
                <ModalContainer
                    buttons={[
                        {
                            id: 0,
                            label: '확인',
                            onPress: this.submit,
                        },
                        {
                            id: 1,
                            label: '취소',
                            onPress: this.onClose,
                        },
                    ]}
                    onClose={this.onClose}>
                    <KeyboardAvoidingView
                        style={styles.contents}
                        behavior='padding'>
                        {/* Header */}
                        <View style={styles.header}>
                            <Text style={styles.headerText}>
                                김태웅님의
                            </Text>
                            <Text style={styles.headerText}>
                                <Text style={styles.headerPointText}>
                                    {dayjs(this.state.startDate).format('MM월 DD일')}
                                </Text>
                                을 수정하시겠습니까?
                            </Text>
                        </View>
    
                        {/* Form */}
                        <View style={styles.form}>
                            {/* 출근 시간 */}
                            <InputBox
                                label='출근 시간'
                                input={
                                    <TimeButton
                                        key={this.state.startTime}
                                        defaultTime={this.state.startTime}
                                        onPress={() => this.onOpenDatePicker('start')}
                                    />
                                }
                             />
                            <InputBox
                                label='퇴근 시간'
                                input={
                                    <TimeButton
                                        key={this.state.endTime}
                                        defaultTime={this.state.endTime} 
                                        onPress={() => this.onOpenDatePicker('end')
                                        }
                                    />
                                }
                            />
                            <InputBox
                                label='금액'
                                input={
                                    <Input
                                        value={this.state.displayedPay.toString()}
                                        onChangeText={(value) => this.onPayChanged(value)}
                                        onBlur={this.numberToString}
                                        onFocus={this.stringToNumber}
                                        keyboardType={numberKeyboardType}
                                    />
                                }
                            />
                        </View>
                    </KeyboardAvoidingView>
                </ModalContainer>
    
                {/* Date Picker */}
                {this.state.isDatePickerVisible && (
                    <DatePicker
                        defaultDate={new Date(displayedTime)}
                        onSelectedListener={(value)=> this.onSelectedListener(value)}
                        onClose={this.onCloseDatePicker}
                        mode='time'
                    />
                )}
            </>
        );
    }
}



// Styles
const styles = StyleSheet.create({
    contents: {
        padding: 15,
    },
    header: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 25,
    },
    headerText: {
        fontSize: 16,
        fontWeight: '500',
        color: THEME.COLOR.MAIN_COLOR,
        lineHeight: 26,
    },
    headerPointText: {
        fontSize: 16,
        fontWeight: '500',
        color: THEME.COLOR.VIOLET_COLOR,
    },
    form: {
        paddingHorizontal: 30,
    },
    inputBox: {
        marginBottom: 25,
    },
    label: {
        marginBottom: 3,
    },
    labelText: {
        fontSize: 14,
        fontWeight: '500',
        color: THEME.COLOR.SUB_COLOR,
    },
    input: {
        flex: 1,
        height: 42,
        borderColor: THEME.COLOR.LIGHT_GRAY,
        borderWidth: 1,
        borderRadius: 2,
        paddingHorizontal: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontFamily: 'Pretendard-Regular',
        fontSize: 16,
        fontWeight: '600',
    },
    timeText: {
        fontSize: 16,
        fontWeight: '500',
        lineHeight: 18,
        color: THEME.COLOR.BLACK_COLOR,
    },
});
