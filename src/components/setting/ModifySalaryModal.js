import React, {Component} from 'react';
import {StyleSheet, View, Alert} from 'react-native';
import dayjs from 'dayjs';

// Components
import ModalContainer from '../../components/modal/ModalContainer';
import InputBox from '../../components/common/InputBox';
import Input from '../../components/common/Input';
import DateButton from '../../components/common/DateButton';
import Text from '../../components/common/Text';
import DatePicker from '../common/DatePicker';

import {amountFormat} from '../../utils/AmountFormat';

// Constants
import {THEME} from '../../constants/theme';
import {numberKeyboardType, onUpdateNumbersOnly} from '../../utils/keyboard';

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
    console.log('cancel button clicked...');
    this.props.cancelButtonListener();
    //this.props.navigation.goBack();
  };

  okButtonClicked = () => {
    console.log('ok button clicked...');
    console.log('this.state.date = ', this.state.date);
    console.log('금액이 숫자가 아닙니다. = ', isNaN(this.state.pay));
    if (
      dayjs(this.state.date).format('YYYY-MM-DD') >=
        dayjs().format('YYYY-MM-DD') &&
      !isNaN(this.state.pay)
    )
      this.props.okButtonListener(this.state.date, this.state.pay);
    else
      Alert.alert(
        '입력오류',
        '날짜는 오늘부터 가능하며, 금액은 숫자만 가능합니다',
      );
  };

  onSelectedListener = value => {
    this.setState({date: value});
  };

  onCloseModal = () => {
    this.setState({isDatePickerModalVisible: false});
  };

  //달력 아이콘 버튼을 눌렀을 때
  openDatePickerModal = () => {
    this.setState({isDatePickerModalVisible: true});
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

  render() {
    return (
      <>
        <ModalContainer
          onClose={this.cancelButtonClicked}
          buttons={this.modalButtons}>
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
          {this.state.isDatePickerModalVisible && (
          <DatePicker
            
            defaultDate={new Date(this.state.date)}
            onSelectedListener={value => this.onSelectedListener(value)}
            mode="date"
            onClose={this.onCloseModal}
            style={styles.datePicker}
          />
        )}
        </ModalContainer>
        
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
