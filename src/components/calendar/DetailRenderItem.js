import {StyleSheet, View} from 'react-native';
import React, {Component} from 'react';
import {THEME} from '../../constants/theme';
import DailyBar from './DailyBar';
import WeeklyBar from './WeeklyBar';
import MonthlyBar from './MonthlyBar';
import Text from '../common/Text';

//Utils
import {amountFormat} from '../../utils/AmountFormat';

export default class DetailRenderItem extends Component {
  constructor(props) {
    super(props);
    this.item = this.props.item;
    this.viewType = this.props.viewType;
  }

  render() {
    const {id, name} = this.props.item.employee;
    const {maxPay, minPay, time, total, holidayPay} = this.props.item;
    const hourly = parseInt(time / 60);
    const minute = time % 60;
    return (
      <View style={styles.userItem} key={id}>
        {/* 이름 */}
        <View style={styles.name}>
          <Text style={styles.nameText} fontWeight={600}>
            {name}
          </Text>
        </View>

        {/* 급여 정보 */}
        <View style={styles.info}>
          <View style={styles.infoItem}>
            <Text style={styles.infoTitleText}>시급</Text>
            <Text style={styles.infoAmountText} fontWeight={500}>
              {amountFormat(minPay)}~{amountFormat(maxPay)}원
            </Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoTitleText}>시간</Text>
            {minute != 0 ? (
              <Text style={styles.infoAmountText} fontWeight={500}>
                {hourly}시간 {minute}분
              </Text>
            ) : (
              <Text style={styles.infoAmountText} fontWeight={500}>
                {hourly}시간
              </Text>
            )}
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoTitleText}>주휴수당</Text>
            <Text
              style={[styles.infoAmountText, styles.allowanceText]}
              fontWeight={500}>
              {amountFormat(holidayPay)}원
            </Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoTitleText}>총 금액</Text>
            <Text
              style={[styles.infoAmountText, styles.totalAmountText]}
              fontWeight={500}>
              {amountFormat(total + holidayPay)}원
            </Text>
          </View>
        </View>

        {/* 차트 */}
        <View style={styles.chart}>
          {this.viewType == '일' && <DailyBar data={this.item.times} />}
          {this.viewType == '주' && <WeeklyBar data={this.item.amounts} />}
          {this.viewType == '월' && <MonthlyBar data={this.item.amounts} />}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  userItem: {
    paddingHorizontal: 25,
    paddingVertical: 16,
    borderBottomColor: THEME.COLOR.LIGHT_GRAY,
    borderBottomWidth: 1,
  },
  name: {
    marginBottom: 8,
  },
  nameText: {
    fontSize: 18,
    color: THEME.COLOR.MAIN_COLOR,
  },
  info: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  infoItem: {
    width: '48%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 5,
  },
  infoTitleText: {
    fontSize: 14,
    fontWeight: '500',
    color: THEME.COLOR.GRAY_COLOR,
  },
  infoAmountText: {
    letterSpacing: -0.3,
    fontSize: 17,
    fontWeight: '500',
    color: THEME.COLOR.BLACK_COLOR,
  },
  allowanceText: {
    color: THEME.COLOR.SUB_COLOR,
  },
  totalAmountText: {
    color: THEME.COLOR.VIOLET_COLOR,
  },
  chart: {
    marginTop: 10,
  },
});
