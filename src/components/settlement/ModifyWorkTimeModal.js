import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Pressable,
  TextInput,
  Alert,
  Platform,
  ScrollView,
  Dimensions,
  TouchableHighlightBase
} from 'react-native';
import dayjs from 'dayjs';

// Components
import ModalContainer2 from '../../components/modal/ModalContainer2';
import Image from '../../components/common/Image';
import DatePicker from '../../components/common/DatePicker';
import Text from '../../components/common/Text';
import InputBox from '../common/InputBox';
import Input from '../common/Input';
import TimeButton from '../common/TimeButton';
import Constant from '../../utils/constants';
import WebServiceManager from '../../utils/webservice_manager';

// Constants
import {THEME} from '../../constants/theme';

// Utils
import {numberKeyboardType, onUpdateNumbersOnly, keyboardBehavior} from '../../utils/keyboard';
import {amountFormat} from '../../utils/AmountFormat';
import { SafeAreaView } from 'react-native-safe-area-context';

// Images
const TimeIcon = require('../../assets/images/time_icon/time_icon.png');

/**
 * @title 정산 급여 수정 모달
 * @returns
 */

export default class ModifyWorkTimeModal extends Component {
  constructor(props) {
    super(props);

    this.data = this.props.route.params.data;
    this.employeeName=this.props.route.params.employeeName;
    //console.log('item data in  아르바이트 시간 수정 모달 = ', this.data);
    const [startHour, startMinute] = this.data.start.split(':');
    const [endHour, endMinute] = this.data.end.split(':');

    this.startDate = dayjs(new Date(this.data.startDate));
    this.endDate = dayjs(this.data.startDate);

    this.startDate = this.startDate.set('hour', startHour);
    this.startDate = this.startDate.set('minute', startMinute);
    this.endDate = this.endDate.set('hour', endHour);
    this.endDate = this.endDate.set('minute', endMinute);

    //console.log('modify start date = ', this.startDate);
    //console.log('modify end date = ', this.endDate);

    this.state = {
      startDate: this.startDate,
      startTime: this.startDate,
      endTime: this.endDate,
      pay: this.data.pay,
      displayedPay: amountFormat(this.data.pay),
      selectedTime: '',
      isDatePickerVisible: false,
    };
  }

  onClose = () => {
    this.props.navigation.goBack();
  };

  onSubmit = () => {
    if(dayjs(this.state.startTime).format('HH-mm') > dayjs(this.state.endTime).format('HH-mm') || 
        parseInt(this.state.pay) <= 0 ||
        this.state.pay.toString().length == 0 || 
        isNaN(this.state.pay))
      Alert.alert('입력오류', '시간 또는 금액이 잘못되었습니다');
    else {
      this.callModifyWorkedTimeAPI().then(response => {
        Alert.alert('근무수정', response.message);
      });
      this.onClose();
    }
  };

  // DatePicker 닫기
  onCloseDatePicker = () => {
    this.setState({isDatePickerVisible: false});
  };

  onOpenDatePicker = value => {
    console.log('datapicker value', value);
    this.setState({selectedTime: value, isDatePickerVisible: true});
  };

  onSelectedListener = value => {
    switch (this.state.selectedTime) {
      case 'start':
        this.setState({startTime: value});
        break;
      case 'end':
        this.setState({endTime: value});
        break;
    }
  };

  onPayChanged = value => {
    this.setState({pay: parseInt(value), displayedPay: value});
  };

  //금액의 숫자를 , 를 넣은 문자열로 변환
  numberToString = () => {
    this.setState({displayedPay: amountFormat(this.state.pay)});
  };

  //,가 있는 금액을 숫자로 변환
  stringToNumber = () => {
    this.setState({displayedPay: this.state.pay});
  };

  //{"id":28,"startDate":"2023-07-02","start":"10:00","end":"17:00","pay":9620}
  async callModifyWorkedTimeAPI() {
    let manager = new WebServiceManager(Constant.serviceURL + '/ModifyWorkedTime','post');
    const formData = {
      id: this.data.id,
      startDate: dayjs(this.data.startDate).format('YYYY-MM-DD'),
      start: dayjs(this.state.startTime).format('HH:mm'),
      end: dayjs(this.state.endTime).format('HH:mm'),
      pay: parseInt(this.state.pay),
    };

    manager.addFormData('data', formData);
    console.log('final form data = ', formData);

    let response = await manager.start();
    if (response.ok) 
      return response.json();
    else 
      Promise.reject(response);
  }

  render() {
    let displayedTime = null;
    if (this.state.selectedTime == 'start')
      displayedTime = this.state.startTime;
    else displayedTime = this.state.endTime;

    return (
      <>
        <ModalContainer2
          bottomInset
          buttons={[
            {
              id: 2,
              label: '근무삭제',
              //onPress: this.onSubmit,
            },
            {
              id: 0,
              label: '취소',
              onPress: this.onClose,
            },
            {
              id: 1,
              label: '확인',
              onPress: this.onSubmit,
            },
            
          ]}
          onClose={this.onClose}>
          
              {/* Header */}
            <View style={styles.header}>
              <Text style={styles.headerText} fontWeight={500}>
                {this.employeeName} 님의
              </Text>
              <Text style={styles.headerText} fontWeight={500}>
                <Text style={styles.headerPointText} fontWeight={600}>
                  {dayjs(this.state.startDate).format('MM월 DD일')}
                </Text>
                을 수정하시겠습니까?
              </Text>
            </View>

            <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss();}}>
            {/* Form */}
            <View style={styles.form}>
              {/* 출근 시간 */}
              <InputBox
                label="출근 시간"
                input={
                  <TimeButton
                    key={this.state.startTime}
                    defaultTime={this.state.startTime}
                    onPress={() => this.onOpenDatePicker('start')}
                  />
                }
              />
              <InputBox
                label="퇴근 시간"
                input={
                  <TimeButton
                    key={this.state.endTime}
                    defaultTime={this.state.endTime}
                    onPress={() => this.onOpenDatePicker('end')}
                  />
                }
              />
              <InputBox
                last
                label="금액"
                input={
                  <Input
                    value={this.state.displayedPay.toString()}
                    onChangeText={value => this.onPayChanged(value)}
                    onBlur={this.numberToString}
                    onFocus={this.stringToNumber}
                    keyboardType={numberKeyboardType}
                  />
                }
              />
            </View>
          </TouchableWithoutFeedback>
        
             
              {/* </View> */}
            {/* Date Picker */}
            {this.state.isDatePickerVisible && 
        
        <DatePicker
          bottomInset
          defaultDate={new Date(displayedTime)}
          onSelectedListener={value => this.onSelectedListener(value)}
          onClose={this.onCloseDatePicker}
          mode="time"
        />
      }
       </ModalContainer2>
      </>
    );
  }
}

// Styles
const styles = StyleSheet.create({
  contents: {
    paddingTop: 25,
    paddingHorizontal: 15,
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    marginTop:20,
  },
  headerText: {
    fontSize: 17,
    lineHeight: 25,
    fontWeight: '500',
    color: THEME.COLOR.MAIN_COLOR,
  },
  headerPointText: {
    fontSize: 17,
    lineHeight: 25,
    letterSpacing: -0.2,
    fontWeight: '600',
    color: THEME.COLOR.VIOLET_COLOR,
  },
  form: {
    paddingHorizontal: 30,
    zIndex: 10,
  },

});
