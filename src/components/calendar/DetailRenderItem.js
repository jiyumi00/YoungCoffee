import { StyleSheet, View } from 'react-native';
import React, { Component } from 'react';
import { THEME } from '../../constants/theme';
import DailyBar from './DailyBar';
import WeeklyBar from './WeeklyBar';
import MonthlyBar from './MonthlyBar';
import Text from '../common/Text';


export default class DetailRenderItem extends Component {
    constructor(props) {
        super(props);        
        this.item=this.props.item;
        this.viewType=this.props.viewType;
    }


    render() {
        const {id,name} = this.props.item.employee;
        const {maxPay, minPay, time, total} =this.props.item;
        const hourly = parseInt(time/60);
        const minute = time%60;
        return (
            <View style={styles.userItem} key={id}>
                {/* 이름 */}
                <View style={styles.name}>
                    <Text style={styles.nameText}>{name}</Text>
                </View>
    
                {/* 급여 정보 */}
                <View style={styles.info}>
                    <View style={styles.infoItem}>
                        <Text style={styles.infoTitleText}>시급</Text>
                        <Text style={styles.infoAmountText}>{minPay}~{maxPay}원</Text>
                    </View>
                    <View style={styles.infoItem}>
                        <Text style={styles.infoTitleText}>시간</Text>
                        {minute!=0 ? (
                            <Text style={styles.infoAmountText}>{hourly}시간 {minute}분</Text>
                        ):(
                            <Text style={styles.infoAmountText}>{hourly}시간</Text>          
                        )}
                        
                    </View>
                    <View style={styles.infoItem}>
                        <Text style={styles.infoTitleText}>주휴수당</Text>
                        <Text style={[styles.infoAmountText, styles.allowanceText]}>
                            없음:원
                        </Text>
                    </View>
                    <View style={styles.infoItem}>
                        <Text style={styles.infoTitleText}>총 금액</Text>
                        <Text
                            style={[styles.infoAmountText, styles.totalAmountText]}>
                            {total}원
                        </Text>
                    </View>
                </View>
    
                {/* 차트 */}
                {this.viewType=='일' && (
                    <DailyBar data={this.item.times} />
                )}
                {this.viewType=='주' && (
                    <WeeklyBar data={this.item.amounts} />
                )}
                {this.viewType=='월' && (
                    <MonthlyBar data={this.item.amounts} />
                )}
            </View>
        );
    }
}



const styles = StyleSheet.create({
    userItem: {
        padding: 25,
        borderBottomColor: THEME.COLOR.LIGHT_GRAY,
        borderBottomWidth: 1,
    },
    name: {
        marginBottom: 4,
    },
    nameText: {
        fontSize: 18,
        fontWeight: '600',
        color: THEME.COLOR.MAIN_COLOR,
    },
    info: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    infoItem: {
        width: '45%',
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        marginVertical: 5,
    },
    infoTitleText: {
        fontSize: 13,
        fontWeight: '500',
        color: THEME.COLOR.GRAY_COLOR,
    },
    infoAmountText: {
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
});

