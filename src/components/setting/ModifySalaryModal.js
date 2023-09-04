import React, {Component} from 'react';
import {StyleSheet, View, Alert, KeyboardAvoidingView, TouchableWithoutFeedback} from 'react-native';
import dayjs from 'dayjs';

// Components
import ModalContainer2 from '../../components/modal/ModalContainer2';
import InputBox from '../../components/common/InputBox';
import Input from '../../components/common/Input';
import DateButton from '../../components/common/DateButton';
import Text from '../../components/common/Text';
import DatePicker from '../common/DatePicker';

import {amountFormat} from '../../utils/AmountFormat';

// Constants
import {THEME} from '../../constants/theme';
import {numberKeyboardType, onUpdateNumbersOnly, keyboardBehavior} from '../../utils/keyboard';

/**
 * @title 직원 정보 수정 팝업
 * @description
 * - changeItem : "phoneNumber" | "salary" | "activation"
 * @returns
 */

export default class ModifySalaryModal extends Component {
  constructor(props) {
    super(props);

    this.modalButtons = [
      {
        id: 1,
        label: '취소',
        onPress: this.cancelButtonClicked,
      },
      {
        id: 2,
        label: '변경',
        onPress: () => {
          this.okButtonClicked();
        },
      },
    ];

    this.state = {
      displayedPay: amountFormat(this.props.data),
      pay: this.props.data,
      date: dayjs(),
      isDatePickerModalVisible: false,
    };
  }

  cancelButtonClicked = () => {
    //console.log('cancel button clicked...');
    this.props.cancelButtonListener();
    //this.props.navigation.goBack();
  };

  //확인 버튼 클릭시 (시급추가) 
  okButtonClicked = () => {
    //금액은 0보다 크고 문자가 아니면(날짜는 과거 미래다 가능, 서버에서 날짜 겹칠 경우 오류반환)
    if (!isNaN(this.state.pay) && parseInt(this.state.pay)>0)
      this.props.okButtonListener(this.state.date, this.state.pay);
    else
      Alert.alert(
        '입력오류',
        '금액을 다시 입력하세요',
      );
  };

  //날짜 선택시
  onSelectedListener = (value) => {
    this.setState({date: value});
  };

  onCloseModal = () => {
    this.setState({isDatePickerModalVisible: false});
  };

  //달력 아이콘 버튼을 눌렀을 때
  openDatePickerModal = () => {
    this.setState({isDatePickerModalVisible: true});
  };

  //모달창에서 시급 금액이 변경될 경우
  onPayChanged = (value) => {
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

  render() {
    return (
      <>
        <ModalContainer2
          onClose={this.cancelButtonClicked}
          buttons={this.modalButtons}>
              <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss();}}>
                <View style={styles.contents}>
                  <View style={styles.header}>
                    <Text style={styles.titleText} fontWeight={600}>
                      {this.props.title} 변경
                    </Text>
                  </View>
                  <InputBox
                    label="날짜"
                    input={
                      <DateButton
                        key={this.state.date}
                        defaultDate={this.state.date}
                        onPress={() => this.openDatePickerModal()}
                      />
                    }
                  />
                  <InputBox
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
         
          {this.state.isDatePickerModalVisible && (
            <DatePicker            
              defaultDate={new Date(this.state.date)}
              onSelectedListener={value => this.onSelectedListener(value)}
              mode="date"
              onClose={this.onCloseModal}
              style={styles.datePicker}
            />
        )}
        </ModalContainer2>
      </>
    );
  }
}

// Styles
const styles = StyleSheet.create({
  contents: {
    paddingVertical: 20,
    paddingHorizontal: 35,
    position: 'relative',
  },
  header: {
    marginBottom: 6,
  },
  titleText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
    color: THEME.COLOR.VIOLET_COLOR,
  },
  messageBox: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 15,
  },
  messageText: {
    fontSize: 17,
    marginBottom: 5,
    fontWeight: '500',
    color: THEME.COLOR.MAIN_COLOR,
  },
  messagePointText: {
    fontSize: 17,
    fontWeight: '600',
    color: THEME.COLOR.VIOLET_COLOR,
  },
  datePicker: {
    zIndex: 10,
    bottom: 0,
    position: 'absolute',
  },
});
