import {
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {Component} from 'react';

// Constants
import {THEME} from '../../constants/theme';
import {settlementState} from '../../constants/settlement';

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
import {initialWindowMetrics, SafeAreaView} from 'react-native-safe-area-context';

//Utils
import {amountFormat} from '../../utils/AmountFormat';

/**
 * @title 정산 디테일 스크린(해당 월을 선택했을 경우 상세페이지)
 * @description
 */

export default class SettlementDetail extends Component {
  constructor(props) {
    super(props);

    this.userID = '';
    this.item = this.props.route.params.data;

    this.state = {
      payDay: dayjs(),
      contents: [],
      confirmContents:[],
      isModifyModalVisible: false,
      isDatePickerModalVisible: false,
    };
  }

  //정산완료된 데이터를 읽을것인지.. 미정산된 데이터를 읽을것인지 판단
  //웹 서비스가 달라짐
  //본 페이지가 포커스를 얻으면 서버로부터 다시 데이터 읽어옴
  componentDidMount() {
    this.props.navigation.addListener('focus',()=> {
      console.log('정산상세보기가 포커스를 얻음');
      //this.onRefresh();
      //정산완료된 데이터를 읽음
      if (this.item.complete == 1) {
        Constant.getUserInfo().then(response => {
          this.userID = response.userID;
          this.callGetCompletedSettlementAPI().then(response => {
            this.setState({contents: response});
          });
        });
      } else {  //정산완료되지 않은 데이터를 읽음
        this.goInitialDatas();
      }
    });
  }


  //정산완료지 않았을 경우 서버로 부터 불러오는 데이터들
  goInitialDatas() {
    Constant.getUserInfo().then(response => {
      this.userID = response.userID;
      this.callGetConfirmListAPI().then(response => {
        this.setState({confirmContents:response});
        this.callGetSettlementAPI().then(response => {
          this.setState({contents: []},()=> {
            this.setState({contents:response});
          });        
        });
      });
    });
  }

  //정산완료되지 않은 데이터에서 아르바이트 시간 수정 선택시
  onModifyListener = (item,employeeName) => {
    console.log('modify Work Time modal item data = ',item,employeeName);
    this.props.navigation.navigate('ModifyWorkTimeModal', {data: item, employeeName:employeeName});
  };

  //마감신청 버튼 클릭시 급여지급일 선택 DatePicker 모달 실행
  setCompleteButtonClicked = () => {
    this.setState({isDatePickerModalVisible: true});
  };

  //급여명세서 발급 클릭시

  requestConfirm=()=> {
    Alert.alert(
      '급여명세서',
      '급여명세서를 발급하고 직원에게 문자를 보냅니다.',
      [
        {
          text: '취소',
          onPress: () => {},
        },
        {
          text: '확인',
          onPress: () => {
            this.goRequestConfirm();
          },
        },
      ],
      {cancelable: false},
    );
    return true;
  }

  onDatePickerModalClose = () => {
    this.setState({isDatePickerModalVisible: false});
  };

  //급여지급일 선택완료하면 마감 신청 실행
  onDateSelectedListener = (value) => {
    this.setState({payDay: value});
    this.goSetCompleteConfirmAlert();
  };

  //마감신청을 진행할것인가?
  goSetCompleteConfirmAlert = () => {
    Alert.alert(
      '마감신청',
      '마감 신청을 하시겠습니까?',
      [
        {
          text: '취소',
          onPress: () => {
            this.setState({payDay: dayjs()});
          },
        },
        {
          text: '확인',
          onPress: () => {
            this.goSetComplete();
          },
        },
      ],
      {cancelable: false},
    );
    return true;
  };

  //마감 신청 진행
  goSetComplete = () => {
    this.callSetCompleteAPI().then(response => {
      if (response.success > 0) {
        Alert.alert('마감신청', '마감 신청이 성공적으로 등록되었습니다.');
        this.props.navigation.goBack();
      } else {
        Alert.alert('마감신청', '마감신청이 실패하였습니다.');
        this.props.navigation.goBack();
      }
    });
  }


  //급여 명세서 발급 진행
  goRequestConfirm=()=> {
    this.callRequestConfirmAPI().then(response => {
      Alert.alert('급여명세서', response.message);
      this.goInitialDatas();
    });
  }

  headerViewForTotalPay=()=> {
    //console.log('헤더 뷰가 실행됨');
    let totalPay=0;
    this.state.contents.map((item)=> {
      totalPay=totalPay+parseInt((item.total+item.holidayPay)/10)*10;
    });

    return (
      <View style={[styles.header,{justifyContent:'flex-end'}]}>
        <View style={styles.screenTitle}>
          <Text style={styles.screenTitleText} fontWeight={600}>
            급여총액 : {'  '+amountFormat(totalPay)+'원'}
          </Text>
        </View>
      </View>
    );
  }

  render() {
    const {date, complete} = this.item;
    const year = date.split('-')[0];
    const month = date.split('-')[1];
    return (
      <View style={styles.container}>
        {/* Header */}
        <SafeAreaView edges={['top']} style={styles.header}>
          {/* Title */}
          <View style={styles.screenTitle}>
            <Text style={styles.screenTitleText} fontWeight={600}>
              {year}년{' '}
            </Text>
            <Text style={styles.screenTitlePointText} fontWeight={600}>
              {month}월{' '}
            </Text>
            <Text style={styles.screenTitleText} fontWeight={600}>
              내역
            </Text>
            <Text
              style={[
                styles.screenStateText,
                {color: settlementState[complete].color},
              ]}>
              ({settlementState[complete].label})
            </Text>
          </View>

          {/* Close Button */}
          <CloseButton />
        </SafeAreaView>

        {/* 일한 아르바이트 직원 리스트 */}
        <FlatList
          data={this.state.contents}
          ListHeaderComponent={()=> ( this.headerViewForTotalPay())}
          renderItem={({item}) => (
            <DetailListItem
              item={item}
              key={item}
              complete={this.item.complete}
              confirmContents={this.state.confirmContents}
              date={this.item.date}
              onModifyListener={(item,employeeName) => this.onModifyListener(item,employeeName)}
            />
          )}          
        />

        {/* 마감 신청 버튼 - complete가 0(마감전)인 경우 마감신청 버튼 활성화 */}
        {complete === 0 && (
          <SafeAreaView
            edges={['bottom']}
            >
              <View style={this.state.confirmContents.length==0 &&styles.buttonView}>
              {this.state.confirmContents.length==0 && (
             <TouchableOpacity
               style={[styles.deadlineButton2,{borderRightWidth:1,borderRightColor:'white'}]}
               activeOpacity={0.8}
               onPress={this.requestConfirm}>
               <Text style={styles.deadlineButtonText}>급여명세서 전송</Text>
             </TouchableOpacity>
           ) }
           <TouchableOpacity
           style={this.state.confirmContents.length==0 ? styles.deadlineButton2:styles.deadlineButton}
           activeOpacity={0.8}
           onPress={this.setCompleteButtonClicked}>
           <Text style={styles.deadlineButtonText}>마감 신청</Text>
         </TouchableOpacity>
              </View>
          
          
          </SafeAreaView>
        )}

        {this.state.isDatePickerModalVisible && (
          <DatePicker
            bottomInset
            title="급여지급일 선택"
            defaultDate={new Date(this.state.payDay)}
            onSelectedListener={value => this.onDateSelectedListener(value)}
            mode="date"
            onClose={this.onDatePickerModalClose}
          />
        )}
      </View>
    );
  }

  //정산한 월에 대한 내역 가져옴(사람이름과 금액)
  async callGetCompletedSettlementAPI() {
    let manager = new WebServiceManager(Constant.serviceURL +'/GetCompletedSettlement?user_id=' +this.userID +'&day=' +this.item.date);
    let response = await manager.start();
    if (response.ok) 
      return response.json();
    else 
      Promise.reject(response);
  }

  //아직 정산하지 않은 내역 가져옴(사람이름과 금액)
  async callGetSettlementAPI() {
    let manager = new WebServiceManager(Constant.serviceURL +'/GetSettlement?user_id=' +this.userID +'&day=' +this.item.date);
    let response = await manager.start();
    if (response.ok) 
      return response.json();
    else 
      Promise.reject(response);
  }

  //급여 명세서 컨펌여부 가져옴
  async callGetConfirmListAPI() {
    let manager = new WebServiceManager(Constant.serviceURL +'/confirm/GetConfirmList?user_id='+this.userID+'&day=' +this.item.date);
    let response = await manager.start();
    if (response.ok) 
      return response.json();
    else 
      Promise.reject(response);
  }


  //마감신청 API
  async callSetCompleteAPI() {
    const payDay = dayjs(this.state.payDay).format('YYYY-MM-DD');
    let manager = new WebServiceManager(Constant.serviceURL +'/SetComplete?user_id=' +this.userID +'&day=' +this.item.date +'&pay_day=' +payDay);
    let response = await manager.start();
    if (response.ok) 
      return response.json();
    else 
      Promise.reject(response);
  }


  //급여명세서 발급 API
  async callRequestConfirmAPI() {
    const employeeIDs = this.state.contents.map((item)=> {
      return item.employee.id;
    });
    const formData = {
      userID:this.userID,
      employeeIDs:employeeIDs,
      belongDate:this.item.date
    }

    let manager = new WebServiceManager(Constant.serviceURL +"/confirm/RequestConfirm","post");
    manager.addFormData("data",formData);
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
    color: THEME.COLOR.BLACK_COLOR,
  },
  screenTitlePointText: {
    fontSize: 20,
    color: THEME.COLOR.VIOLET_COLOR,
  },
  screenStateText: {
    marginLeft: 6,
    fontSize: 15,
    fontWeight: '400',
  },

  listSeparator: {
    height: 6,
  },
  listFooter: {
    height: 40,
  },
  buttonView:{
    flexDirection:'row', 
    justifyContent:'center'
  },
  deadlineButton2:{

    height: 60,
    width:'50%',
    backgroundColor: THEME.COLOR.MAIN_COLOR,
    justifyContent: 'center',
    alignItems: 'center',
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
