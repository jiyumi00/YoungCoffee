import React, { Component } from 'react';
import { FlatList, StyleSheet, View, Pressable } from 'react-native';

import dayjs from 'dayjs';

import Image from '../common/Image';
// Constants
import { THEME } from '../../constants/theme';
import Text from '../common/Text';

// Images
const LinkIcon = require('../../assets/images/link_icon/link_icon.png');

const FULL_DATA = [
    {
        id: 1,
        name: '김가가',
        createdAt: 1677628800000,
        annualIncome: 40000000,
        active: true,
    },
    {
        id: 2,
        name: '이나나',
        createdAt: 1677628800000,
        annualIncome: 30000000,
        active: true,
    },
    {
        id: 3,
        name: '김가가',
        createdAt: 1677628800000,
        annualIncome: 40000000,
        active: false,
    },
];

export default class FullTimeList extends Component {
    constructor(props){
        super(props);
    }    

    detailEmployee=(item)=> {
        console.log('detail Employee View',item);
        this.props.navigation.navigate('FullTimeDetail');
        
        /*
        this.props.navigation.navigate('EmployeeDetail', {
            userID: item.id,
            employeeType: 'fullTime'
        });*/
    }

    render() {
        return(
            <FlatList
                contentContainerStyle={{ flexGrow: 1 }}
                data={FULL_DATA}
                renderItem={({item})=>this.renderItem(item)}
                ItemSeparatorComponent={<View style={styles.separator} />}
                ListFooterComponent={<View style={styles.separator} />}
            />
        );
    }


    renderItem=(item)=> {
        const date = dayjs(item.createdAt).format('YYYY. MM. DD');
        //const annualIncome = fullTimeEmployee ? item.annualIncome : amountFormat(item.annualIncome);
        return (
            <Pressable style={styles.employee} onPress={()=>this.detailEmployee(item)}>
                {/* Left Contents - 이름 */}
                <View style={styles.employeeName}>
                    <Text
                        style={[
                            styles.employeeNameText,
                            !item.active ? styles.deactivationText : null,
                        ]}>
                        {item.name}
                    </Text>
                    <Image source={LinkIcon} style={styles.linkIcon} />
                </View>

                {/* 
            - 입사일, 연봉
            - 활성화된 직원일 경우에만 정보 표시
             */}
                {item.active && (
                    <View style={styles.employeeInfo}>
                        <View style={styles.createdAt}>
                            <Text style={styles.employeeInfoText}>
                                {date}
                            </Text>
                        </View>
                        <View style={styles.line} />
                        <View style={styles.annualIncome}>
                            <Text style={styles.employeeInfoText}>
                                {item.annualIncome}원
                            </Text>
                        </View>
                    </View>
                )}
            </Pressable>
        );
    }   
}







// Styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: THEME.COLOR.WHITE_COLOR,
    },
    contents: {
        flex: 1,
    },
    employee: {
        paddingVertical: 18,
        paddingHorizontal: 25,
        flexDirection: 'row',
        alignItems: 'center',
    },
    employeeName: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    employeeNameText: {
        fontSize: 17,
        fontWeight: '600',
        color: THEME.COLOR.MAIN_COLOR,
    },
    deactivationText: {
        color: THEME.COLOR.SILVER,
    },
    linkIcon: {
        width: 12,
        height: 12,
        marginLeft: 10,
    },
    employeeInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    employeeInfoText: {
        fontSize: 15,
        fontWeight: '300',
        color: THEME.COLOR.GRAY_COLOR,
    },
    createdAt: {},
    line: {
        width: 1,
        height: 14,
        backgroundColor: THEME.COLOR.LIGHT_GRAY,
        marginHorizontal: 12,
    },
    annualIncome: {},
    separator: {
        width: '100%',
        height: 1,
        backgroundColor: THEME.COLOR.LIGHT_GRAY,
    },
});