import {
  StyleSheet,
  View,
  Text,
  Modal,
  StatusBar,
  ScrollView,
} from 'react-native';
import React, {Component} from 'react';
import RNDatePicker from 'react-native-date-picker';
import dayjs from 'dayjs';
import ModalContainer from '../modal/ModalContainer';

import {THEME} from '../../constants/theme';
import {SafeAreaView} from 'react-native-safe-area-context';

//react-native-date-picker을 이용한 DatePicker에 들어가는 date파라메터는
//기본적으로 new Date()로 생성한 타입이여야 함
//따라서 new Date(dayjs) 타입으로 변환해야 함
export default class DatePicker extends Component {
  constructor(props) {
    super(props);
    this.date = this.props.defaultDate;
    this.mode = this.props.mode;

    if (this.props.hasOwnProperty('title')) this.title = this.props.title;
    else this.title = '';

    this.state = {
      selectedDate: this.date,
    };
  }

  okButtonClicked = () => {
    this.props.onSelectedListener(this.state.selectedDate);
    this.props.onClose();
  };

  onClose = () => {
    this.props.onClose();
  };

  render() {
    return (
      
      <ModalContainer
        bottomInset={this.props.bottomInset}
        onClose={this.onClose}
        buttons={[
          {
            id: 0,
            label: '취소',
            onPress: this.onClose
          },
          {
            id: 1,
            label: '확인',
            onPress: ()=>this.okButtonClicked()
          },
        ]}>
        {this.title != '' && (
          <View style={styles.header}>
            <Text style={styles.titleText}>{this.title}</Text>
          </View>
        )}
        <View style={styles.contents}>
          <RNDatePicker
            date={this.state.selectedDate}
            onDateChange={value => this.setState({selectedDate: value})}
            mode={this.mode}
            locale="ko"
            minuteInterval={10}
          />
        </View>
      </ModalContainer>
    );
  }
}

const styles = StyleSheet.create({
  contents: {
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  header: {
    marginBottom: 6,
    paddingTop: 20,
  },
  titleText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
    color: THEME.COLOR.VIOLET_COLOR,
  },
});
