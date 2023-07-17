import React, { Component } from 'react';
import { FlatList, StyleSheet, View, Pressable } from 'react-native';

import dayjs from 'dayjs';

import Image from '../common/Image';
// Constants
import { THEME } from '../../constants/theme';
import Text from '../common/Text';

//Component
import WebServiceManager from '../../utils/webservice_manager';
import Constant from '../../utils/constants';

// Images
const LinkIcon = require('../../assets/images/link_icon/link_icon.png');

//active: true -> 활성화된 직원 ()
const PART_DATA = [
    {
        id: 1,
        name: '박바바',
        createdAt: 1677628800000,
        annualIncome: 9790,
        active: true,
    },
    {
        id: 2,
        name: '이나나',
        createdAt: 1677628800000,
        annualIncome: 9790,
        active: true,
    },
    {
        id: 3,
        name: '이아아',
        createdAt: 1677628800000,
        annualIncome: 9790,
        active: true,
    },
    {
        id: 4,
        name: '김자자',
        createdAt: 1677628800000,
        annualIncome: 9790,
        active: false,
    },
];

export default class PartTimeList extends Component {
    constructor(props){
        super(props);
        this.userID='';

        this.state={
            contents:[]
        }
    }    

    componentDidMount() {
        Constant.getUserInfo().then((response)=> {
            this.userID=response.userID;
            this.callGetDailyEmployeesAPI().then((response)=> {
                console.log('daily employees = ',response);
                this.setState({contents:response});
            })
        })
    }

    detailEmployee=(item)=> {
        console.log('detail Employee View');
        this.props.navigation.navigate('PartTimeDetail');
        /*
        this.props.navigation.navigate('EmployeeDetail', {
            userID: item.id,
            employeeType: 'partTime'
        });*/
    }

    async callGetDailyEmployeesAPI() {
        console.log('userID = ',this.userID);
        let manager = new WebServiceManager(Constant.serviceURL+"/GetDailyEmployees?user_id="+this.userID);
        let response = await manager.start();
        if (response.ok)
            return response.json();
        else
            Promise.reject(response);
    }

    render() {
        return(
            <FlatList
                contentContainerStyle={{ flexGrow: 1 }}
                data={this.state.contents}
                renderItem={({item})=>this.renderItem(item)}
                ItemSeparatorComponent={<View style={styles.separator} />}
                ListFooterComponent={<View style={styles.separator} />}
            />
        );
    }

   
    renderItem=(item)=> {
        //const date = dayjs(item.createdAt).format('YYYY. MM. DD');
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
             
                {/*{item.active && ( */}
                {true && (
                    <View style={styles.employeeInfo}>
                        <View style={styles.createdAt}>
                            <Text style={styles.employeeInfoText}>
                                {item.startDate}
                            </Text>
                        </View>
                        <View style={styles.line} />
                        <View style={styles.annualIncome}>
                            <Text style={styles.employeeInfoText}>
                                {item.pay}원
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