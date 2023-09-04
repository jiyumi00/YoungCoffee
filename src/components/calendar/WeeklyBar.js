import {StyleSheet, View} from 'react-native';
import React, {Component} from 'react';
import {THEME} from '../../constants/theme';
import Text from '../common/Text';

//근무한 시간량을 Bar형태로 보여주기
export default class WeeklyBar extends Component {
  constructor(props) {
    super(props);
    this.weeks = ['월', '화', '수', '목', '금', '토', '일'];
    this.position = [1, 2, 3, 4, 5, 6, 7];
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
        thisWeek: amount.thisWeek,
      };
      //console.log("holidaypay+++",amountObj);
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
      <View style={[styles.titleItem, {width: this.boxSize}]} key={index}>
        <Text style={styles.titleItemText}>{item}</Text>
      </View>
    );
  };

  barItem = (item, index) => {
    let exist = false;
    let amountObj = null;
    let hourly = null;
    let minute = null;
    let thisWeek = null;

    if (this.amountsMap.has(item)) {
      amountObj = this.amountsMap.get(item);
      hourly = parseInt(amountObj.amount / 60);
      minute = amountObj.amount % 60;
      thisWeek = amountObj.thisWeek;
      exist = true;
    }

    return (
      <View
        style={[
          styles.boxes,
          {
            width: this.boxSize,
            backgroundColor: barColor[index % 3],
          },
        ]}
        key={index}>
        {exist &&
          (minute != 0 ? (
            <Text style={styles.boxesText}>
              {hourly}:{minute}
            </Text>
          ) : (
            <Text style={styles.boxesText}>{hourly}:00</Text>
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
    height: 26,
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
    fontSize: 14,
    textAlign: 'center',
    fontWeight: '600',
    color: THEME.COLOR.WHITE_COLOR,
  },
  timeText: {
    fontSize: 12,
  },
  titleItem: {},
  titleItemText: {
    fontSize: 12,
    marginBottom: 2,
    fontWeight: '500',
    color: THEME.COLOR.GRAY_COLOR,
  },
});
