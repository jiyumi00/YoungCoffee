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
const TimeIcon = require('../../assets/images/time_icon/time_icon.png');

/**
 * @title Date 설정 버튼
 * @description
 * - 받아온 mode props 값에 따라 표시되는 형식이 달라짐
 * @returns
 */

export default class TimeButton extends Component {
  constructor(props) {
    super(props);
    this.onPress = this.props.onPress;

    this.state = {
      defaultTime: null,
    };
  }

  componentDidMount() {
    this.setState({defaultTime: dayjs(this.props.defaultTime).format('HH:mm')});
  }

  render() {
    console.log('Time Button re render===', this.state.defaultTime);
    return (
      <Pressable
        style={styles.input}
        onPress={() => {
          this.onPress();
        }}>
        <Text style={styles.inputText}>{this.state.defaultTime}</Text>
        <Image source={TimeIcon} style={styles.icon} />
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
    width: 15,
    position: 'absolute',
    right: 15,
  },
});
