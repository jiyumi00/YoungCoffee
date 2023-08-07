import {StyleSheet, View} from 'react-native';
import React, {Component} from 'react';
import {THEME} from '../../constants/theme';
import {amountFormat} from '../../utils/AmountFormat';
import Text from '../common/Text';

//근무한 시간량을 Bar형태로 보여주기
export default class MonthlyBar extends Component {
  constructor(props) {
    super(props);
    this.weeks = ['1주', '2주', '3주', '4주', '5주', '6주'];
    this.position = [1, 2, 3, 4, 5, 6];
    this.amounts = this.props.data;
    this.boxSize = (100 / this.weeks.length).toString().concat('%');

    this.amountsMap = new Map();
    for (let i = 0; i < this.amounts.length; i++) {
      const amount = this.amounts[i];
      const position = amount.position;
      const amountObj = {
        amount: amount.amount,
        total: amount.total,
        startDate: amount.startDate,
        holidayPay: amount.holidayPay,
      };
      this.amountsMap.set(position, amountObj);
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{flexDirection: 'row'}}>
          {this.weeks.map((item, index) => this.titleItem(item, index))}
        </View>
        <View style={{flexDirection: 'row'}}>
          {this.position.map((item, index) => this.barItem(item, index))}
        </View>
      </View>
    );
  }

  titleItem = (item, index) => {
    return (
      <View style={[{width: this.boxSize}]} key={index}>
        <Text style={styles.titleItemText}>{item}</Text>
      </View>
    );
  };

  barItem = (item, index) => {
    let exist = false;
    let amountObj = null;
    let hourly = null;
    let minute = null;
    if (this.amountsMap.has(item)) {
      amountObj = this.amountsMap.get(item);
      hourly = parseInt(amountObj.amount / 60);
      minute = amountObj.amount % 60;
      holidayPay = amountObj.holidayPay;
      exist = true;
    }

    return (
      <View
        style={[
          {
            width: this.boxSize,
            backgroundColor: barColor[index % 3],
          },
          styles.boxes,
        ]}
        key={index}>
        {exist &&
          (minute != 0 ? (
            <Text style={styles.boxesText}>
              {hourly}:{minute}{' '}
              {holidayPay != 0 ? '(' + amountFormat(holidayPay) + ')' : ''}
            </Text>
          ) : (
            <Text style={styles.boxesText}>
              {hourly}:00{' '}
              {holidayPay != 0 ? '(' + amountFormat(holidayPay) + ')' : ''}
            </Text>
          ))}
      </View>
    );
  };
}

const barColor = ['#18ABA1', '#E868A0', '#295CC5'];

// Styles
const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  boxes: {
    height: 38,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: '100%',
    backgroundColor: 'pink',
    flex: 1,
  },
  line: {
    width: 1,
    backgroundColor: THEME.COLOR.LIGHT_GRAY,
  },
  boxesText: {
    fontSize: 13,
    lineHeight: 14,
    textAlign: 'center',
    fontWeight: '600',
    color: THEME.COLOR.WHITE_COLOR,
  },
  timeText: {
    fontSize: 12,
  },
  titleItemText: {
    fontSize: 12,
    marginBottom: 2,
    fontWeight: '500',
    color: THEME.COLOR.GRAY_COLOR,
  },
});
