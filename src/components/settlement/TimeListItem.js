import React, { Component } from 'react';
import { StyleSheet, View, Pressable } from 'react-native';

// constants
import { THEME } from '../../constants/theme';

// Components
import Image from '../common/Image';
import Text from '../common/Text';

//Utils
import { amountFormat } from '../../utils/AmountFormat';

// Images
const ModifyIcon = require('../../assets/images/modify_icon/modify_icon.png');
//일한 시간 리스트의 각 항목
export default class TimeListItem extends Component {
  constructor(props) {
    super(props);
    this.item = this.props.item;
    this.modifyModal = this.props.onPress;
    //console.log('정산에서 타임 정보 = ',this.props.item);
  }

  render() {
    //console.log('timelistitem item : ',this.item);
    const hourly = parseInt(this.item.amount / 60);
    const minute = this.item.amount % 60;
    return (
      <View style={styles.history}>
        <View style={styles.historyTitle}>
          <Text style={styles.historyTitleText}>
            {this.item.startDate}&nbsp;(
            {(this.item.amount / 60).toFixed(0)}시간
            {this.item.amount % 60 === 0 ? null : (
              <Text style={styles.historyTitleText}>
                {' '}
                {this.item.amount % 60}분
              </Text>
            )}
            )
          </Text>
        </View>
        <Pressable style={styles.historySetting} onPress={this.modifyModal}>
          <View style={styles.historyAmount}>
            <Text style={styles.historyAmountText} fontWeight={500}>
              {amountFormat(this.item.total)}원
            </Text>
          </View>

          {/* <Pressable style={styles.historySetting} onPress={this.modifyModal}> */}
          <Image source={ModifyIcon} style={styles.settingIcon} />
        </Pressable>
      </View>
    );
  }
}

// Styles
const styles = StyleSheet.create({
  history: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: 25,
    paddingRight: 20,
    paddingVertical: 10,
  },
  historyTitle: {
    flex: 1,
  },
  historyTitleText: {
    fontSize: 16,
    fontWeight: '400',
    letterSpacing: -0.2,
    color: THEME.COLOR.GRAY_COLOR,
  },
  historyAmount: {},
  historyAmountText: {
    fontSize: 16,
    fontWeight: '500',
    //alignItems:'center',
    color: THEME.COLOR.BLACK_COLOR,
  },
  historySetting: {
    flexDirection: 'row',
    alignItems: 'center',


  },
  settingIcon: {
    width: 17,
    justifyContent: 'center',
    alignItems: 'flex-end',
    height: 17,
    marginLeft:5
  },
});
