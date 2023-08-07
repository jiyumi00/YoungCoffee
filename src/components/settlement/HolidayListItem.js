import React, {Component} from 'react';
import {StyleSheet, View, Pressable} from 'react-native';

// constants
import {THEME} from '../../constants/theme';

// Components
import Image from '../common/Image';
import Text from '../common/Text';

//Utils
import {amountFormat} from '../../utils/AmountFormat';

// Images
const SettingIcon = require('../../assets/images/setting_icon/setting_icon.png');

//주휴수당 리스트의 각 항목
export default class HolidayListItem extends Component {
  constructor(props) {
    super(props);
    this.item = this.props.item;
  }

  render() {
    return (
      <View style={styles.history}>
        <View style={styles.historyTitle}>
          <Text style={styles.historyTitleText}>
            {this.item.startDate} ~ {this.item.endDate.substring(5)}
            &nbsp;(
            {(this.item.holidayAmount / 60).toFixed(0)}시간
            {this.item.amount % 60 === 0 ? null : (
              <Text style={styles.historyTitleText}>
                {' '}
                {this.item.amount % 60}분
              </Text>
            )}
            )
          </Text>
        </View>

        <View style={styles.historyAmount}>
          <Text style={styles.historyAmountText} fontWeight={500}>
            {amountFormat(this.item.holidayPay)}원
          </Text>
        </View>

        <View style={styles.historySetting} />
      </View>
    );
  }
}

// Styles
const styles = StyleSheet.create({
  history: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 25,
    paddingRight: 18,
    paddingVertical: 8,
  },
  historyTitle: {
    flex: 1,
  },
  historyTitleText: {
    letterSpacing: -0.2,
    fontSize: 16,
    fontWeight: '400',
    color: THEME.COLOR.GRAY_COLOR,
  },
  historyAmount: {},
  historyAmountText: {
    fontSize: 16,
    fontWeight: '500',
    color: THEME.COLOR.BLACK_COLOR,
  },
  historySetting: {
    width: 26,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
});
