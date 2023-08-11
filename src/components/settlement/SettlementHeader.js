import {StyleSheet, View, StatusBar} from 'react-native';
import React, {Component} from 'react';
import dayjs from 'dayjs';

// Components
import Image from '../common/Image';
import Text from '../common/Text';

// Constants
import {THEME} from '../../constants/theme';

// styles
const styles = StyleSheet.create({
  header: {
    paddingVertical: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoBox: {
    marginVertical: 15,
  },
  textBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  monthEndText: {
    fontSize: 24,
    lineHeight: 34,
    fontWeight: '600',
    color: THEME.COLOR.SUB_COLOR,
  },
  titleText: {
    fontSize: 16,
    fontWeight: '500',
    color: THEME.COLOR.BLACK_COLOR,
  },
  today: {},
  todayText: {
    fontSize: 15,
    fontWeight: '400',
    color: THEME.COLOR.GRAY_COLOR,
  },
});

export default class SettlementHeader extends Component {
  constructor(props) {
    super(props);
    this.MONTH_END = dayjs().endOf('month').format('YYYY년 MM월 DD일');
    this.TODAY = dayjs().format('YYYY년 MM월 DD일');
  }

  render() {
    return (
      <View style={styles.header}>
         
        {/* Alarm Icon */}
        <Image source={require('../../assets/images/alarm/alarm.png')} />

        {/* Month End */}
        <View style={styles.infoBox}>
          <View style={styles.textBox}>
            <Text style={styles.monthEndText} fontWeight={600}>
              {this.MONTH_END}
            </Text>
            <Text style={styles.titleText} fontWeight={500}>
              은
            </Text>
          </View>

          <View style={styles.textBox}>
            <Text style={styles.titleText} fontWeight={500}>
              월말 마감일입니다.
            </Text>
          </View>
        </View>

        {/* Today */}
        <View style={styles.today}>
          <Text style={styles.todayText}>오늘 - {this.TODAY}</Text>
        </View>
      </View>
    );
  }
}
