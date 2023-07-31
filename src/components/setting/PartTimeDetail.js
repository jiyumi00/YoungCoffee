import React, { Component, useCallback } from 'react';
import { StyleSheet, View, FlatList, Pressable, Alert } from 'react-native';
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

import Constant from '../../utils/constants';
import WebServiceManager from '../../utils/webservice_manager';

// Utils
import { amountFormat } from '../../utils/AmountFormat';

import { shouldUseActivityState } from 'react-native-screens';


// Images
const DeleteIcon = require('../../assets/images/delete_icon/delete_icon.png');
const ModifyIcon = require('../../assets/images/modify_icon/modify_icon.png');

//state:0 -> 현재 진행중인 연봉/시급
//state:1 -> 지난 연봉/시급 
//state:2 -> ??



/**
 * @title 유저 디테일 정보 스크린
 * @description
 * - route로 받아온 userID 값을 이용해 유저 정보 가져오기
 * - route로 받아온 employeeType 값을 이용해 표시되는 값들 변경
 * @returns
 */

export default class PartTimeDetail extends Component {
    constructor(props) {
        super(props);

        this.state={
            contents:{}
        }
    }

    componentDidMount() {
        this.goGetEmployeeDetail();
    }

    goGetEmployeeDetail=()=> {
        this.callGetEmployeeDetailAPI().then((response)=> {
            console.log('직원 상세 정보 response = ',response);
            this.setState({contents:response});
        })
    }

    async callGetEmployeeDetailAPI() {
        let manager = new WebServiceManager(Constant.serviceURL+"/GetEmployeeDetail?employee_id="+this.props.route.params.employeeID);
        let response = await manager.start();
        if (response.ok)
            return response.json();
        else
            Promise.reject(response);
    }

    render() {
        return (
            <View style={styles.container}>
                <Insets>
                    {/* Contents */}
                    {Object.keys(this.state.contents).length!=0 && (
                    <FlatList
                        data={null}
                        style={styles.contents}
                        renderItem={null}
                        ListHeaderComponent={()=><BaseInfo item={this.state.contents} refreshListener={this.goGetEmployeeDetail}/>}
                        ListFooterComponent={()=><AdditionalInfo pays={this.state.contents.pays}/>}
                    />)}
                </Insets>
            </View>
        );
    }
}

//직원의 기본적인 정보 (이륻부터 활성화상태까지)
class BaseInfo extends Component {
    constructor(props) {
        super(props);

        this.tel=this.props.item.tel;

        this.state={
            phoneModalVisible:false,
            salaryModalVisible:false,
            activateModalVisible:false,
            isActivate:false,
        }
        
    }

    componentDidMount() {
        if(this.props.item.validate==1)
            this.setState({isActivate:true});
        else
            this.setState({isActivate:false});
    }

    //폰번호 수정시 팝업 
    editPhoneModal=()=> {
        this.setState({phoneModalVisible:true});
    }

    //전화번호 수정 (수정 후 상위 클래스에서 refresh)
    getPhoneNumber=(phoneNumber)=> {
        this.setState({phoneModalVisible:false});
        this.callModifyDailyEmployeeAPI(phoneNumber,this.state.isActivate? 1:0).then((response)=> {
            this.props.refreshListener();
            if(response.success==0)
                Alert.alert("정보수정","정보수정에 실패했습니다");
        });
    }

    //시급수정시 팝업
    editSalaryModal=()=> {
        this.setState({salaryModalVisible:true});
    }


    //시급수정 (수정 후 상위 클래스에서 refresh)
    getSalary=(date,pay)=> {
        this.setState({salaryModalVisible:false});
        this.callModifyDailyPayAPI(date,pay).then((response)=> {
            this.props.refreshListener();
            if(response.success<=0)
                Alert.alert("시급수정",response.message);
        });
    }

    //활성화 버튼 팝업
    editActivationModal=()=> {
        this.setState({activateModalVisible:true});
    }


    //활성화 상태 수정 (수정 후 상위 클래스에서 refresh)
    getActivate=(activate)=> {
        console.log('activate=',activate);
        this.setState({activateModalVisible:false, isActivate:activate});
        this.callModifyDailyEmployeeAPI(this.tel,activate? 1:0).then((response)=> {
            this.props.refreshListener();
            if(response.success==0)
                Alert.alert("정보수정","정보수정에 실패했습니다");
        });

    }

    cancelButtonListener=(value)=> {
        this.setState(value);
    }

    async callModifyDailyPayAPI(date,pay) {
        let manager = new WebServiceManager(Constant.serviceURL+"/ModifyDailyPay","post");

        const formData={
            employeeID:this.props.item.id,
            startDate:dayjs(date).format("YYYY-MM-DD"),
            pay:parseInt(pay)
        };
            
        manager.addFormData("data",formData);        
        let response = await manager.start();
        if (response.ok)
            return response.json();
        else
            Promise.reject(response);
    }

    async callModifyDailyEmployeeAPI(tel,validate){
        let manager = new WebServiceManager(Constant.serviceURL+"/ModifyDailyEmployee","post");

        const formData={
            employeeID:this.props.item.id,
            tel:tel,
            validate:validate
        };
            
        manager.addFormData("data",formData);        
        let response = await manager.start();
        if (response.ok)
            return response.json();
        else
            Promise.reject(response);
    }

    render() {
        const {name,cNumber,tel,startDate,pay} = this.props.item;
        
        return(<>
            {/* header */}
            <SettingHeader title='' />

            {/* Contents Header */}
            <View style={styles.contentsHeader}>                   
                <View style={[styles.employeeType, styles.fullTime]}>
                    <Text style={styles.employeeTypeText}>아르바이트</Text>
                </View>                  

                <View style={styles.userName}>
                    <Text style={styles.userNameText}>{name}</Text>
                </View>

                <View style={styles.idCardNumber}>
                    <Text style={styles.idCardNumberText}>
                        {Constant.transformCNumber(cNumber)}
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
                                {Constant.transformPhoneNumber(tel)}
                            </Text>
                            {this.state.isActivate && (
                                <Pressable
                                    style={styles.modifyButton}
                                    onPress={() =>this.editPhoneModal()}>
                                    <Image
                                        source={ModifyIcon}
                                        style={styles.buttonIcon}
                                    />
                                </Pressable>
                            )}
                        </>
                    }
                />

                <UserInfoItemBox
                    label='입사일'
                    value={
                        <Text style={styles.valueText}>{startDate}</Text>
                    }
                />

                <UserInfoItemBox
                    label='시급 (단위 원)'
                    value={
                        <>
                            <Text style={styles.valueText}>{amountFormat(pay)}</Text>
                            {this.state.isActivate && (
                            <Pressable
                                style={styles.modifyButton}
                                onPress={() =>this.editSalaryModal()}>
                                <Image
                                    source={ModifyIcon}
                                    style={styles.buttonIcon}
                                />
                            </Pressable>
                            )}
                        </>
                    }
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
                <ModifyPhoneModal data={tel} okButtonListener={this.getPhoneNumber} cancelButtonListener={()=>this.cancelButtonListener({phoneModalVisible:false})}/>
            )}
            {this.state.salaryModalVisible && (
                <ModifySalaryModal data={pay} title="시급" okButtonListener={(date,pay)=>this.getSalary(date,pay)} cancelButtonListener={()=>this.cancelButtonListener({salaryModalVisible:false})}/>
            )}
            {this.state.activateModalVisible && (
                <ModifyActivationModal data={this.state.isActivate} okButtonListener={this.getActivate} cancelButtonListener={()=>this.cancelButtonListener({activateModalVisible:false})}/>
            )}
            </>
        );
    }
}


//시급 변경 내역 리스트
class AdditionalInfo extends Component {
    constructor(props){
        super(props);
    }
    

    render() {
        return (
            <View style={styles.salaryDetails}>
                <View style={styles.detailsTitle}>
                    <Text style={styles.detailsTitleText}>시급 변경 내역</Text>
                </View>

                <FlatList
                    data={this.props.pays}
                    renderItem={({ item }) => this.renderItem(item)}
                    nestedScrollEnabled
                    ItemSeparatorComponent={Line}
                />
            </View>
        );
    }

    renderItem=(item)=> {
        const endDate = item.endDate=='2100-12-31' ? "현재" : item.endDate;
        return (
            <View
                style={[styles.detailItem]}>
                <View style={styles.detailItemHeader}>
                    <Text
                        style={[styles.detailDate]}>
                        {item.startDate} ~ {endDate}
                    </Text>
                </View>

                <View style={styles.detailAmount}>
                    <Text
                        style={[styles.amountText]}>
                        {amountFormat(item.pay)}
                    </Text>
                    <Text
                        style={[ styles.unitText,]}> 원
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