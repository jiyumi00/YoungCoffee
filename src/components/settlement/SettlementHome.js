import React, {Component} from 'react';
import {StyleSheet, View, Pressable, FlatList} from 'react-native';

// Components
import Insets from '../common/Insets';
import Image from '../common/Image';
import Text from '../common/Text';
import SettlementHeader from './SettlementHeader';
import Constant from '../../utils/constants';
import WebServiceManager from '../../utils/webservice_manager';

import dayjs from 'dayjs';

// Constants
import {THEME} from '../../constants/theme';
import {settlementState} from '../../constants/settlement';
import {SafeAreaView} from 'react-native-safe-area-context';
import { dateFormat } from '../../utils/DateFormat';

// Images
const CalendarIcon = require('../../assets/images/calendar/calendar.png');
const LinkIcon = require('../../assets/images/link_icon/link_icon.png');

//정산관리 홈
//마감완료와 미정산 부분 구분하여 월 리스트 관리
export default class SettlementHome extends Component {
  constructor(props) {
    super(props);

    this.state = {
      refresh: false,
      contents: [],
    };
  }

  componentDidMount() {
    this.props.navigation.addListener('focus',()=> {
      console.log('마감리스트가 포커스를 얻음');
      Constant.getUserInfo().then(response => {
        this.userID = response.userID;
        this.getSettlementList();
      });
    });    
  }

  async callGetSettlementListAPI() {
    let manager = new WebServiceManager(Constant.serviceURL + '/GetSettlementList?user_id=' + this.userID);
    let response = await manager.start();
    if (response.ok) 
      return response.json();
    else 
      Promise.reject(response);
  }

  getSettlementList = () => {
    this.callGetSettlementListAPI().then(response => {
      //console.log('settlement list = ', response);
      this.setState({contents: response});
    });
  };

  //리스트의 항목을 클릭시 (월 별 상세페이지오 이동 data는 다음...
  //SettlementDetail.js로 이동
  //[{"complete": 0, "date": "2023-07"}, {"complete": 0, "date": "2023-06"}, {"complete": 1, "date": "2023-05"}]
  goSettlementDetail = (item) => {
    this.props.navigation.navigate('SettlementDetails', {data: item});
  };

  render() {
    const startDate = dayjs().subtract(5,"month").format("YYYY-MM");
    const endDate = dayjs().format("YYYY-MM");
    return (
      <SafeAreaView
        style={homeStyles.container} edges={['right', 'bottom', 'left', 'top']}>
        <Insets>
          {/* Header - 이번 달 마감 날짜 표시 */}
          <SettlementHeader />

          {/* List 확인에 필요한 Date */}
          <View style={homeStyles.selectedDate}>
            <Pressable style={homeStyles.selectedDateButton}>
              <Text style={homeStyles.selectedDateText}>{startDate} ~ {endDate}</Text>
              <Image source={CalendarIcon} />
            </Pressable>
          </View>

          {/* 정산한 월, 미정산한 월 리스트 */}
          <FlatList
            style={homeStyles.list}
            data={this.state.contents}
            refreshing={false}
            onRefresh={this.getSettlementList}
            ItemSeparatorComponent={() => (
              <View style={homeStyles.listSeparator} />
            )}
            renderItem={({item}) => (
              <ListItem
                item={item}
                onPress={() => this.goSettlementDetail(item)}
              />
            )}
          />
        </Insets>
      </SafeAreaView>
    );
  }
}

//월 리스트의 항목
class ListItem extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const {date, complete} = this.props.item;
    const {label, color} = settlementState[complete];

    return (
      <Pressable style={renderStyles.listItem} onPress={this.props.onPress}>
        <View style={renderStyles.itemDate}>
          <Text style={renderStyles.itemDateText} fontWeight={500}>
            {date}
          </Text>
          <Image style={renderStyles.linkIcon} source={LinkIcon} />
        </View>

        <View style={renderStyles.itemState}>
          <Text style={[renderStyles.itemStateText, {color}]}>{label}</Text>
        </View>
      </Pressable>
    );
  }
}

// homeStyles
const homeStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.COLOR.WHITE_COLOR,
  },
  selectedDate: {
    paddingHorizontal: 30,
    paddingBottom: 5,
  },
  selectedDateButton: {
    borderColor: THEME.COLOR.LIGHT_GRAY,
    borderWidth: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  selectedDateText: {
    fontSize: 16,
    fontWeight: '400',
    color: THEME.COLOR.BLACK_COLOR,
  },
  list: {
    paddingVertical: 20,
  },

  listSeparator: {
    height: 24,
  },
});

// renderStyles
const renderStyles = StyleSheet.create({
  listItem: {
    paddingHorizontal: 35,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  itemDate: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemDateText: {
    fontSize: 18,
    lineHeight: 20,
    color: THEME.COLOR.MAIN_COLOR,
  },
  linkIcon: {
    width: 30,
    marginLeft: 10,
  },
  itemState: {},
  itemStateText: {
    fontSize: 16,
    lineHeight: 18,
    fontWeight: '400',
    color: THEME.COLOR.VIOLET_COLOR,
  },
});
