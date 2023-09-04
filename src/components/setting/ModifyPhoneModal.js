import React, {Component} from 'react';
import {Alert, StyleSheet, View,KeyboardAvoidingView,TouchableWithoutFeedback} from 'react-native';
import dayjs from 'dayjs';

// Components
import ModalContainer2 from '../../components/modal/ModalContainer2';
import InputBox from '../../components/common/InputBox';
import Input from '../../components/common/Input';
import DateButton from '../../components/common/DateButton';
import Text from '../../components/common/Text';

// Constants
import {THEME} from '../../constants/theme';
import {onUpdateNumbersOnly,keyboardBehavior} from '../../utils/keyboard';
import Constant from '../../utils/constants';



/**
 * @title 직원 정보 수정 팝업
 * @description
 * - changeItem : "phoneNumber" | "salary" | "activation"
 * @returns
 */

export default class ModifyPhoneModal extends Component {
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

    //this.state={phoneNumber:this.props.route.params.data}
    this.state = {
      phoneNumber: this.props.data,
    };
  }

  cancelButtonClicked = () => {
    //console.log('cancel button clicked...');
    this.props.cancelButtonListener();
  };

  okButtonClicked = () => {
    const phoneNumber = this.state.phoneNumber.replaceAll('-', '');
    if (phoneNumber.length < 11)
      Alert.alert('입력오류', '전화번호 형식이 아닙니다');
    else 
      this.props.okButtonListener(phoneNumber);
  };

  render() {
    return (
      <ModalContainer2
        bottomInset
        onClose={this.cancelButtonClicked}
        buttons={this.modalButtons}>
          <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss();}}>
            <View style={styles.contents}>
              <View style={styles.header}>
                <Text style={styles.titleText} fontWeight={600}>
                  연락처 변경
                </Text>
              </View>
              <InputBox
                label="연락처"
                input={
                  <Input
                    defaultValue={Constant.transformPhoneNumber(
                      this.state.phoneNumber,
                    )}
                    onChangeText={value => this.setState({phoneNumber: value})}
                  />
                }
              />
            </View>
          </TouchableWithoutFeedback>
      </ModalContainer2>
    );
  }
}



// Styles
const styles = StyleSheet.create({
  contents: {
    paddingVertical: 20,
    paddingHorizontal: 35,
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
});
