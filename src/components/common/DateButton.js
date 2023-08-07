import React, {Component} from 'react';
import {StyleSheet, Pressable} from 'react-native';
import dayjs from 'dayjs';

// Components
import Image from './Image';

// Constants
import {THEME} from '../../constants/theme';

// Utils
import {dateFormat, timeFormat} from '../../utils/DateFormat';
import Text from './Text';

// Images
const DateIcon = require('../../assets/images/date_icon/date_icon.png');

/**
 * @title Date 설정 버튼
 * @description
 * - 받아온 mode props 값에 따라 표시되는 형식이 달라짐
 * @returns
 */

export default class DateButton extends Component {
  constructor(props) {
    super(props);
    this.onPress = this.props.onPress;

    this.state = {
      defaultDate: null,
    };
  }

  componentDidMount() {
    this.setState({
      defaultDate: dayjs(this.props.defaultDate).format('YYYY-MM-DD'), //날짜 위치kh
    });
  }

  render() {
    return (
      <Pressable style={styles.input} onPress={this.onPress}>
        <Text style={styles.inputText} fontWeight={400}>
          {this.state.defaultDate}
        </Text>
        <Image source={DateIcon} style={styles.icon} />
      </Pressable>
    );
  }
}

// Styles
const styles = StyleSheet.create({
  input: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderColor: THEME.COLOR.LIGHT_GRAY,
    borderWidth: 1,
    borderStyle: 'solid',
    paddingHorizontal: 12,
    height: 40,
  },
  inputText: {
    fontSize: 16,
    color: THEME.COLOR.MAIN_COLOR,
  },
  icon: {
    width: 14,
    position: 'absolute',
    right: 14,
  },
});
