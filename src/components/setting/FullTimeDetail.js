import React, { Component, useCallback } from 'react';
import { StyleSheet, View, FlatList, Pressable } from 'react-native';
import dayjs, { extend } from 'dayjs';

// Constants
import { THEME } from '../../constants/theme';

// Components
import Insets from '../../components/common/Insets';
import ToggleButton from '../../components/common/ToggleButton';
import Image from '../../components/common/Image';
import SettingHeader from '../../components/setting/SettingHeader';
import Text from '../../components/common/Text';
import UserInfoItemBox from '../../components/setting/UserInfoItemBox';
import Line from '../../components/common/Line';

import ModifyPhoneModal from './ModifyPhoneModal';
import ModifySalaryModal from './ModifySalaryModal';
import ModifyActivationModal from './ModifyActivationModal';



// Images
const DeleteIcon = require('../../assets/images/delete_icon/delete_icon.png');
const ModifyIcon = require('../../assets/images/modify_icon/modify_icon.png');

//state:0 -> 현재 진행중인 연봉/시급
//state:1 -> 지난 연봉/시급 
//state:2 -> ??

const BASE_DATA={
    id:1,
    name:'김가가',
    phone:'01012345678',
    inDate:'2023-06-01',
    salary:4000,
    isActivate:false
}

const DETAILS_DATA = [
    {
        id: 1,
        state: 0,
        amount: 42000000,
        startDate: 1686713163113,
        endDate: null,
    },
    {
        id: 3,
        state: 1,
        amount: 42000000,
        startDate: 1686713163113,
        endDate: 1686723163113,
    },
    {
        id: 4,
        state: 1,
        amount: 42000000,
        startDate: 1686713163113,
        endDate: 1686723163113,
    },
    {
        id: 5,
        state: 2,
        amount: 42000000,
        startDate: 1686713163113,
        endDate: 1686723163113,
    },
];


/**
 * @title 유저 디테일 정보 스크린
 * @description
 * - route로 받아온 userID 값을 이용해 유저 정보 가져오기
 * - route로 받아온 employeeType 값을 이용해 표시되는 값들 변경
 * @returns
 */

export default class FullTimeDetail extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.container}>
                <Insets>
                    {/* Contents */}
                    <FlatList
                        data={null}
                        style={styles.contents}
                        renderItem={null}
                        ListHeaderComponent={()=><BaseInfo navigation={this.props.navigation}/>}
                        ListFooterComponent={()=><AdditionalInfo/>}
                    />
                </Insets>
            </View>
        );
    }
}

class BaseInfo extends Component {
    constructor(props) {
        super(props);

        this.state={
            phoneModalVisible:false,
            salaryModalVisible:false,
            activateModalVisible:false,
            isActivate:BASE_DATA.isActivate
        }
        
    }

    editPhoneModal=()=> {
        this.setState({phoneModalVisible:true});
        //this.props.navigation.navigate('ModifyPhoneModal', {data:BASE_DATA.phone,onResultListener:this.getPhoneResult});
    }

    getPhoneNumber=(phoneNumber)=> {
        this.setState({phoneModalVisible:false});
        console.log('phone hnumber=',phoneNumber);
    }

    editSalaryModal=()=> {
        this.setState({salaryModalVisible:true});
        //this.props.navigation.navigate('ModifySalaryModal', {data:BASE_DATA.salary,title:'연봉',onResultListener:this.getSalary});
    }

    getSalary=(salary)=> {
        this.setState({salaryModalVisible:false});
        console.log('salary=',salary);
    }

    editActivationModal=()=> {
        //this.props.navigation.navigate('ModifyActivationModal', {data:this.state.isActivate,onResultListener:this.getActivate});
        this.setState({activateModalVisible:true});
    }

    getActivate=(activate)=> {
        console.log('activate=',activate);
        this.setState({activateModalVisible:false, isActivate:activate});
    }

    cancelButtonListener=(value)=> {
        this.setState(value);
    }

    render() {
        return(<>
            {/* header */}
            <SettingHeader title='' />

            {/* Contents Header */}
            <View style={styles.contentsHeader}>                   
                <View style={[styles.employeeType, styles.fullTime]}>
                    <Text style={styles.employeeTypeText}>정직원</Text>
                </View>                  

                <View style={styles.userName}>
                    <Text style={styles.userNameText}>{BASE_DATA.name}</Text>
                </View>

                <View style={styles.idCardNumber}>
                    <Text style={styles.idCardNumberText}>
                        961126-1234567
                    </Text>
                </View>
            </View>

            {/* UserInfo */}
            <View style={styles.userInfo}>
                <UserInfoItemBox
                    label='연락처'
                    value={
                        <>
                            <Text style={styles.valueText}>
                                {BASE_DATA.phone}
                            </Text>
                            <Pressable
                                style={styles.modifyButton}
                                onPress={() =>this.editPhoneModal()}>
                                <Image
                                    source={ModifyIcon}
                                    style={styles.buttonIcon}
                                />
                            </Pressable>
                        </>
                    }
                />

                <UserInfoItemBox
                    label='입사일'
                    value={
                        <Text style={styles.valueText}>{BASE_DATA.inDate}</Text>
                    }
                />

                <UserInfoItemBox
                    label='연봉 (단위 만원)'
                    value={
                        <>
                            <Text style={styles.valueText}>{BASE_DATA.salary}</Text>
                            <Pressable
                                style={styles.modifyButton}
                                onPress={() =>this.editSalaryModal()}>
                                <Image
                                    source={ModifyIcon}
                                    style={styles.buttonIcon}
                                />
                            </Pressable>
                        </>
                    }
                />

                <UserInfoItemBox
                    label='상여금 포함 여부'
                    value={<Text style={styles.valueText}>O</Text>}
                />

                <UserInfoItemBox
                    label='퇴직금 포함 여부'
                    value={<Text style={styles.valueText}>X</Text>}
                />

                <UserInfoItemBox
                    label='활성화 상태'
                    value={
                        <ToggleButton
                            active={this.state.isActivate}
                            onPress={() =>this.editActivationModal()}
                        />
                    }
                />
            </View>

            {/* 연락처/ 연봉또는 시급/ 활성화 상태 변경하는 모달 */}
            {/* 모달 뜨는 위치 확인 바람 */}
            {this.state.phoneModalVisible && (
                <ModifyPhoneModal data={BASE_DATA.phone} okButtonListener={this.getPhoneNumber} cancelButtonListener={()=>this.cancelButtonListener({phoneModalVisible:false})}/>
            )}
            {this.state.salaryModalVisible && (
                <ModifySalaryModal data={BASE_DATA.salary} title="연봉" okButtonListener={this.getSalary} cancelButtonListener={()=>this.cancelButtonListener({salaryModalVisible:false})}/>
            )}
            {this.state.activateModalVisible && (
                <ModifyActivationModal data={this.state.isActivate} okButtonListener={this.getActivate} cancelButtonListener={()=>this.cancelButtonListener({activateModalVisible:false})}/>
            )}
            </>
        );
    }
}



class AdditionalInfo extends Component {
    constructor(props){
        super(props);
    }
    

    render() {
        return (
            <View style={styles.salaryDetails}>
                <View style={styles.detailsTitle}>
                    <Text style={styles.detailsTitleText}>연봉 상세 내역</Text>
                </View>

                <FlatList
                    data={DETAILS_DATA}
                    renderItem={({ item }) => this.renderItem(item)}
                    nestedScrollEnabled
                    ItemSeparatorComponent={Line}
                />
            </View>
        );
    }

    renderItem=(item)=> {
        const date =
        item.state === 0
            ? `${dayjs(item.startDate).format(
                    'YYYY-MM-DD',
                )} ~`
            : `${dayjs(item.startDate).format(
                    'YYYY-MM-DD',
                )} ~ ${dayjs(item.endDate).format(
                    'YYYY-MM-DD',
                )}`;

        const disabledState = item.state === 2;

        return (
            <View
                style={[
                    styles.detailItem,
                    disabledState
                        ? styles.disabledDetailItem
                        : null,
                ]}>
                <View style={styles.detailItemHeader}>
                    <Text
                        style={[
                            styles.detailDate,
                            disabledState
                                ? styles.disabledText
                                : null,
                        ]}>
                        {date}
                    </Text>
                    {item.state === 0 ? (
                        <>
                            <Pressable>
                                <Image source={DeleteIcon} style={styles.buttonIcon}/>
                            </Pressable>

                            <Pressable style={styles.modifyButton}>
                                <Image source={ModifyIcon} style={styles.buttonIcon}/>
                            </Pressable>
                        </>
                    ) : null}
                </View>

                <View style={styles.detailAmount}>
                    <Text
                        style={[
                            styles.amountText,
                            disabledState
                                ? styles.disabledText
                                : null,
                        ]}>
                        {item.amount}
                    </Text>
                    <Text
                        style={[
                            styles.unitText,
                            disabledState
                                ? styles.disabledText
                                : null,
                        ]}>
                        만원
                    </Text>
                </View>
            </View>
        );
    }
} 




// Styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: THEME.COLOR.WHITE_COLOR,
    },
    header: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        alignItems: 'flex-end',
    },
    contents: {},
    contentsHeader: {
        justifyContent: 'center',
        alignItems: 'flex-start',
        paddingTop: 0,
        paddingBottom: 25,
        paddingHorizontal: 25,
    },
    employeeType: {
        paddingVertical: 3,
        paddingHorizontal: 12,
        borderRadius: 2,
        marginBottom: 10,
    },
    employeeTypeText: {
        fontSize: 13,
        fontWeight: '600',
        color: THEME.COLOR.WHITE_COLOR,
    },
    fullTime: {
        backgroundColor: THEME.COLOR.BLUE_COLOR,
    },
    partTime: {
        backgroundColor: THEME.COLOR.VIOLET_COLOR,
    },
    userName: {
        marginBottom: 3,
    },
    userNameText: {
        fontSize: 24,
        fontWeight: '600',
        color: THEME.COLOR.MAIN_COLOR,
    },
    idCardNumber: {},
    idCardNumberText: {
        fontSize: 15,
        fontWeight: '400',
        color: THEME.COLOR.MAIN_COLOR,
    },
    userInfo: {
        paddingVertical: 15,
        paddingHorizontal: 25,
        borderTopColor: THEME.COLOR.LIGHT_GRAY,
        borderTopWidth: 1,
        borderBottomColor: THEME.COLOR.LIGHT_GRAY,
        borderBottomWidth: 1,
    },
    valueText: {
        fontSize: 17,
        fontWeight: '400',
        color: THEME.COLOR.MAIN_COLOR,
    },
    salaryDetails: { paddingTop: 30, paddingBottom: 20 },
    detailsTitle: {
        paddingHorizontal: 25,
        paddingBottom: 10,
        borderBottomColor: THEME.COLOR.LIGHT_GRAY,
        borderBottomWidth: 1,
    },
    detailsTitleText: {
        fontSize: 15,
        fontWeight: '600',
        color: THEME.COLOR.MAIN_COLOR,
    },
    detailItem: {
        paddingHorizontal: 30,
        paddingVertical: 16,
    },
    detailItemHeader: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    modifyButton: {
        marginLeft: 12,
    },
    buttonIcon: {
        width: 16,
        height: 16,
    },
    detailDate: {
        flex: 1,
        fontSize: 15,
        fontWeight: '500',
        color: THEME.COLOR.SUB_COLOR,
        marginBottom: 2,
    },
    detailAmount: {
        flexDirection: 'row',
        alignItems: 'flex-end',
    },
    amountText: {
        fontSize: 19,
        fontWeight: '600',
        color: THEME.COLOR.BLACK_COLOR,
    },
    unitText: {
        fontSize: 14,
        fontWeight: '600',
        color: THEME.COLOR.BLACK_COLOR,
        marginLeft: 2,
    },
    line: {},
    disabledDetailItem: {
        backgroundColor: THEME.COLOR.GHOST_WHITE,
    },
    disabledText: {
        color: THEME.COLOR.GRAY_COLOR,
    },
});


