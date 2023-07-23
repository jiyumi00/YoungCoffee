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
const SettingIcon = require('../../assets/images/setting_icon/setting_icon.png');


//일한 시간 리스트의 각 항목
export default class TimeListItem extends Component {
    constructor(props) {
        super(props);
        this.item=this.props.item;
        this.modifyModal=this.props.onPress;
    }

    render() {
        const hourly = parseInt(this.item.amount/60);
        const minute = this.item.amount%60;
        return (
            <View style={styles.history}>
                <View style={styles.historyTitle}>
                    <Text style={styles.historyTitleText}>{this.item.startDate} : ({(this.item.amount / 60).toFixed(0)}시간{this.item.amount % 60 === 0 ? null : <Text style={styles.historyTitleText}> {this.item.amount % 60}분</Text>})</Text>
                </View>

                <View style={styles.historyAmount}>
                    <Text style={styles.historyAmountText}>{amountFormat(this.item.total)}원</Text>
                </View>


                <Pressable style={styles.historySetting} onPress={this.modifyModal}>
                    <Image source={SettingIcon} />
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
        paddingHorizontal: 25,
        paddingVertical: 8,
    },
    historyTitle: {
        flex: 1,
    },
    historyTitleText: {
        fontSize: 14,
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
