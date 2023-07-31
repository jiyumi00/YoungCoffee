import { StyleSheet, View, FlatList, TouchableOpacity, Alert } from 'react-native';
import React, { Component } from 'react';

// Constants
import { THEME } from '../../constants/theme';
import { settlementState } from '../../constants/settlement';

// Components
import Insets from '../../components/common/Insets';
import CloseButton from '../../components/common/CloseButton';
import DetailSectionHeader from '../../components/settlement/DetailSectionHeader';
import DetailListItem from '../../components/settlement/DetailListItem';
import Text from '../../components/common/Text';
import Constant from '../../utils/constants';
import WebServiceManager from '../../utils/webservice_manager';
import DatePicker from '../common/DatePicker';


import dayjs from 'dayjs';


/**
 * @title 정산 디테일 스크린(해당 월을 선택했을 경우 상세페이지)
 * @description
 */

export default class SettlementDetail extends Component{
    constructor(props){
        super(props);

        this.userID='';
        this.item = this.props.route.params.data;

        this.state={
            payDay:dayjs(),
            contents:[],
            isModifyModalVisible:false,
            isDatePickerModalVisible:false
        }
    }

    //정산완료된 데이터를 읽을것인지.. 미정산된 데이터를 읽을것인지 판단
    //웹 서비스가 달라짐
    componentDidMount() {
        //정산완료된 데이터를 읽음
        if(this.item.complete==1) {
            Constant.getUserInfo().then((response)=> {
                this.userID=response.userID;
                this.callGetCompletedSettlementAPI().then((response)=> {
                    this.setState({contents:response});
                });
            });
        }
        else {
            Constant.getUserInfo().then((response)=> {
                this.userID=response.userID;
                this.callGetSettlementAPI().then((response)=> {
                    this.setState({contents:response});
                });
            });
        }
    }    


    //정산완료되지 않은 데이터에서 아르바이트 시간 수정 선택시
    onModifyListener=(item)=> {
        this.props.navigation.navigate('ModifyWorkTimeModal', { data: item });
    }

    //마감신청 버튼 클릭시 급여지급일 선택 DatePicker 모달 실행
    setCompleteButtonClicked=()=> {
        this.setState({isDatePickerModalVisible:true});
        
    }

    onDatePickerModalClose=()=> {
        this.setState({isDatePickerModalVisible:false});
    }

    //급여지급일 선택완료하면 마감 신청 실행
    onDateSelectedListener = (value) => {
        this.setState({ payDay: value });
        this.goSetCompleteConfirmAlert();
    }

    //마감신청을 진행할것인가?
    goSetCompleteConfirmAlert = () => {
        Alert.alert('마감신청','마감 신청을 하시겠습니까?',
        [
            { text: '취소', onPress: () => { this.setState({payDay:dayjs()}) } },
            { text: '확인', onPress: () => { this.goSetComplete() } },
        ],
        { cancelable: false });
        return true;
   }

   //마감 신청 진행
   goSetComplete=()=> {
        this.callSetCompleteAPI().then((response)=> {
            if(response.success>0) {
                Alert.alert('마감신청','마감 신청이 성공적으로 등록되었습니다.');
                this.props.navigation.goBack();
            }
            else {
                Alert.alert('마감신청','마감신청이 실패하였습니다.');
                this.props.navigation.goBack();
            }
        });
    }


    render(){
        const { date, complete } = this.item;
        const year = date.split("-")[0];
        const month = date.split("-")[1];
        return(
            <View style={styles.container}>
            <Insets>
                {/* Header */}
                <View style={styles.header}>
                    {/* Title */}
                    <View style={styles.screenTitle}>
                        <Text style={styles.screenTitleText}>{year}년 </Text>
                        <Text style={styles.screenTitlePointText}>{month}월{' '}</Text>
                        <Text style={styles.screenTitleText}>내역</Text>
                        <Text style={[styles.screenStateText,{ color: settlementState[complete].color }]}>
                            ({settlementState[complete].label})
                        </Text>
                    </View>

                    {/* Close Button */}
                    <CloseButton />
                </View>

                {/* 일한 아르바이트 직원 리스트 */}
                <FlatList
                    data={this.state.contents}
                    renderItem={({item})=> <DetailListItem 
                    item={item} 
                    key={item} 
                    complete={this.item.complete} 
                    date={this.item.date} 
                    onModifyListener={(item)=>this.onModifyListener(item)}/>}
                    />

                {/* 마감 신청 버튼 - complete가 0(마감전)인 경우 마감신청 버튼 활성화 */}
                {complete === 0 && (
                    <TouchableOpacity style={styles.deadlineButton} activeOpacity={0.8} onPress={this.setCompleteButtonClicked}>
                        <Text style={styles.deadlineButtonText}>마감 신청</Text>
                    </TouchableOpacity>
                )}

                {this.state.isDatePickerModalVisible && (
                    <DatePicker
                        title="급여지급일 선택"
                        defaultDate={new Date(this.state.payDay)}
                        onSelectedListener={(value) => this.onDateSelectedListener(value)}
                        mode="date"
                        onClose={this.onDatePickerModalClose}/>
                )}
            </Insets>
        </View>
        );
    }


    //정산한 월에 대한 내역 가져옴(사람이름과 금액)
    async callGetCompletedSettlementAPI() {
        let manager = new WebServiceManager(Constant.serviceURL+"/GetCompletedSettlement?user_id="+this.userID+"&day="+this.item.date);
        let response = await manager.start();
        if (response.ok)
            return response.json();
        else
            Promise.reject(response);
    }


    //아직 정산하지 않은 내역 가져옴(사람이름과 금액)
    async callGetSettlementAPI() {
        let manager = new WebServiceManager(Constant.serviceURL+"/GetSettlement?user_id="+this.userID+"&day="+this.item.date);
        let response = await manager.start();
        if (response.ok)
            return response.json();
        else
            Promise.reject(response);
    } 


    //마감신청 API
    async callSetCompleteAPI() {
        const payDay=dayjs(this.state.payDay).format("YYYY-MM-DD");
        let manager = new WebServiceManager(Constant.serviceURL+"/SetComplete?user_id="+this.userID+"&day="+this.item.date+"&pay_day="+payDay);
        let response = await manager.start();
        if (response.ok)
            return response.json();
        else
            Promise.reject(response);
    } 
}


// styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: THEME.COLOR.WHITE_COLOR,
    },
    header: {
        paddingVertical: 15,
        paddingHorizontal: 25,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    screenTitle: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    screenTitleText: {
        fontSize: 20,
        fontWeight: '600',
        color: THEME.COLOR.BLACK_COLOR,
    },
    screenTitlePointText: {
        fontSize: 20,
        fontWeight: '600',
        color: THEME.COLOR.VIOLET_COLOR,
    },
    screenStateText: {
        marginLeft: 8,
        fontSize: 15,
        fontWeight: '600',
    },

    listSeparator: {
        height: 6,
    },
    listFooter: {
        height: 40,
    },
    deadlineButton: {
        height: 60,
        backgroundColor: THEME.COLOR.MAIN_COLOR,
        justifyContent: 'center',
        alignItems: 'center',
    },
    deadlineButtonText: {
        fontSize: 18,
        color: THEME.COLOR.WHITE_COLOR,
    },
    history: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 25,
        paddingVertical: 8,
    },
    historyTitle: {
        flex: 1,
    },
    historyTitleText: {},
    historyAmount: {},
    historyAmountText: {
        fontSize: 16,
        fontWeight: '600',
        color: THEME.COLOR.BLACK_COLOR,
    },
    historySetting: {
        width: 26,
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
});

