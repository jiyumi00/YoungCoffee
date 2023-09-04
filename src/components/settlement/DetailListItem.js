import {
  StyleSheet,
  View,
  Pressable,
  FlatList,
  TextInput,
  Platform,
  TouchableOpacity,
} from 'react-native';
import React, {Component} from 'react';
import dayjs from 'dayjs';

//Components
import Constant from '../../utils/constants';
import WebServiceManager from '../../utils/webservice_manager';
import HolidayListItem from './HolidayListItem';

// Styles
import Image from '../common/Image';
import TimeListItem from './TimeListItem';
import Text from '../common/Text';

// Constants
import {THEME} from '../../constants/theme';
import {historyType} from '../../constants/settlement';

// Utils
import {amountFormat} from '../../utils/AmountFormat';
import DetailsSectionHeader from './DetailSectionHeader';
import { ThemeProvider } from '@react-navigation/native';

// Images
const SelectIcon = require('../../assets/images/select_icon/select_icon.png');

//월별 직원들의 리스트 보기
//직원 리스트를 터치하면 상세내역 보기
//상세내역은 정산완료 또는 미정산 상태에 따라 다르게 표현

export default class DetailListItem extends Component {
  constructor(props) {
    super(props);
    this.item = this.props.item;
    this.complete = this.props.complete;
    this.date = this.props.date;
    this.userID = '';
    this.confirmContents=this.props.confirmContents;

    this.state = {
      onToggle: false,
      detailState: this.props.detailState,

      holidayContents: [],
      timeContents: []
    };
  }


  //아르바이트 직원 이름에서 확장 터치 시(근무한 시간 리스트 , 주휴수당 리스트 API호출)
  onFolding = () => {
    this.setState({onToggle: !this.state.onToggle}, () => {
      if (this.state.onToggle && this.complete==0) {
        Constant.getUserInfo().then((response)=> {
          this.userID = response.userID;
          this.callGetHolidayListAPI().then(response => {
            //console.log('holiday list = ', response);
            this.setState({holidayContents: response});
          });
        });
        Constant.getUserInfo().then((response)=> {
          this.userID = response.userID;
          this.callGetWorkedTimeListAPI().then(response => {
            //console.log('time list = ', response);
            this.setState({timeContents: response});
          });
        });
      }
    });
  };

  async callGetHolidayListAPI() {
    let manager = new WebServiceManager(Constant.serviceURL +'/GetHolidayList?employee_id=' +this.item.employee.id +'&day=' +this.date);
    let response = await manager.start();
    if (response.ok) 
      return response.json();
    else 
      Promise.reject(response);
  }

  async callGetWorkedTimeListAPI() {
    let manager = new WebServiceManager(Constant.serviceURL +'/GetWorkedTimeList?employee_id=' +this.item.employee.id +'&day=' +this.date);
    let response = await manager.start();
    if (response.ok) 
      return response.json();
    else 
      Promise.reject(response);
  }

  async callGetConfirmListAPI() {
    let manager = new WebServiceManager(Constant.serviceURL +'/confirm/GetConfirmList?user_id='+this.userID+'&day=' +this.date);
    let response = await manager.start();
    if (response.ok) 
      return response.json();
    else 
      Promise.reject(response);
  }

  onModifyListener = (item) => {
    //console.log('modify listener clicked....in Detail List Item', item, this.item.employee.name);
    this.props.onModifyListener(item,this.item.employee.name);
  };

  render() {
    return (
      <Pressable style={styles.employee} >
        {/* Line */}
        <View style={styles.line} />

        {/* Employee Settlement Preview */}
        <View style={styles.employeeInfo}>
          <View style={styles.userName}>
            <Text style={styles.userNameText} fontWeight={500}>
              {this.item.employee.name}
            </Text>     
            
            {this.complete==0 && (
            <Text style={styles.userNameText}>
              {console.log('confirmContents',this.confirmContents)}
              {this.confirmContents.length!=0 && this.confirmContents.map((item)=> {
                if(item.id==this.item.employee.id)
                  return <View key={item} style={item.status==0 ?styles.statusCheck:[styles.statusCheck,{backgroundColor:THEME.COLOR.MAIN_COLOR}]}></View>
              })}
            </Text>)}       
          </View>

          <TouchableOpacity  onPress={this.onFolding} style={{flexDirection:'row'}} >
          <View style={styles.totalAmount}>
            <Text style={styles.totalAmountText} fontWeight={600}>
              {amountFormat(parseInt((this.item.total + this.item.holidayPay) / 10) * 10)}원</Text>
          </View>

            
            <View
            style={[
              styles.toggleIcon,
              this.state.onToggle && styles.activeToggleIcon
            ]}>
            <Image source={SelectIcon} style={styles.selectIcon}/>
          </View>
            </TouchableOpacity>
        
        </View>

        {/*  미정산된 내역 (사람이름 리스트)에서 상세히 보기 화살표를 터치했을 경우 근무시간 목록과 주휴수당 목록 보기*/}
        {this.state.onToggle && this.complete == 0 && this.state.timeContents.length!=0 && this.state.holidayContents.length!=0 &&(
          <HistoryListItem
            holidayContents={this.state.holidayContents}
            timeContents={this.state.timeContents}
            key={this.state.holidayContents}
            report={this.item}
            onModifyListener={item => this.onModifyListener(item)}
          />
        )}

        {/*정산된 내역 보기 (급여총액과 주휴수당 총액만 보여줌*/}
        {this.state.onToggle && this.complete == 1 && (
          <CompletedListItem item={this.item} />
        )}

        {/* Line */}
        <View style={styles.line} />
      </Pressable>
    );
  }
}

//미정산된 리스트 상세보기 (일한 내역 및 주휴수당 내역 보여주기)
class HistoryListItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      holidayList: [],
      timeList: [],
    };
  }

  componentDidMount() {
    this.setState({
      holidayList: this.props.holidayContents,
      timeList: this.props.timeContents,
    });
  }

  onModifyWorkTime = item => {
    //console.log('일한 시간 수정 버튼 클릭', item);
    this.props.onModifyListener(item);
  };

  render() {
    
    return (
      <>
        <DetailsSectionHeader title="급여" payTotal={this.props.report.total} />
        <FlatList
          data={this.state.timeList}
          style={styles.historyList}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({item}) => {
            return (
              <TimeListItem
                item={item}
                onPress={() => this.onModifyWorkTime(item)}
              />
            );
          }}
        />

        <DetailsSectionHeader
          title="주휴수당"
          payTotal={this.props.report.holidayPay}
        />
        <FlatList
          data={this.state.holidayList}
          style={styles.historyList}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({item}) => {
            return <HolidayListItem item={item} />;
          }}
        />
      </>
    );
  }
}

//정산된 리스트에서 상세보기 (급여와 주휴수당 보여주기)
class CompletedListItem extends Component {
  constructor(props) {
    super(props);
    this.item = this.props.item;
  }

  render() {
    //console.log('detaillistitem item : ',this.item)
    return (
      <View style={completedStyles.historyWrap}>
        <View style={completedStyles.history}>
          <View style={completedStyles.historyTitle}>
            <Text style={completedStyles.historyTitleText}>급여</Text>
          </View>

          <View style={completedStyles.historyAmount}>
            <Text style={completedStyles.historyAmountText} fontWeight={500}>
              {amountFormat(this.item.total)}원
            </Text>
          </View>
          <View style={completedStyles.historySetting} />
        </View>

        <View style={completedStyles.history}>
          <View style={completedStyles.historyTitle}>
            <Text style={completedStyles.historyTitleText}>주휴수당</Text>
          </View>

          <View style={completedStyles.historyAmount}>
            <Text style={completedStyles.historyAmountText} fontWeight={500}>
              {amountFormat(this.item.holidayPay)}원
            </Text>
          </View>
          <View style={completedStyles.historySetting} />
        </View>
      </View>
    );
  }
}

// Styles
const completedStyles = StyleSheet.create({
  historyWrap: {
    borderTopColor: THEME.COLOR.LIGHT_GRAY,
    borderTopWidth: 1,
    paddingVertical: 8,
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
  historyTitleText: {
    fontSize: 15,
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
    width: 18,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
 
});

// Styles
const styles = StyleSheet.create({
  employee: {},
  line: {
    height: 1,
    width: '100%',
    backgroundColor: THEME.COLOR.LIGHT_GRAY,
  },
  employeeInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 17,
    paddingHorizontal: 25,
  },
  userName: {
    flex: 1,
    flexDirection:'row',
  },
  userNameText: {
    fontSize: 17,
    lineHeight: 17,
    fontWeight: '400',
    color: THEME.COLOR.BLACK_COLOR,
    marginRight:5,
  },
  totalAmount: {},
  totalAmountText: {
    fontSize: 17,
    lineHeight: 17,
    fontWeight: '600',
    color: THEME.COLOR.SUB_COLOR,
  },
  toggleIcon: {
    marginLeft: 10,
    opacity: 0.3,
  },
  activeToggleIcon: {
    transform: [{scaleY: -1}],
  },
  historyList: {
    paddingVertical: 6,
    borderTopWidth: 1,
    borderTopColor: THEME.COLOR.LIGHT_GRAY,
    borderStyle: Platform.OS === 'ios' ? 'solid' : 'dashed',
  },
  selectIcon:{
    width:15,
    height:15,
  },
  statusCheck:{
    width:8,
    height:8,
    borderRadius:10,
    backgroundColor:THEME.COLOR.GRAY_COLOR
  },
});
