import React, {Component} from 'react';
import {FlatList, Pressable, StyleSheet, View} from 'react-native';
import dayjs from 'dayjs';

// Components
import WebServiceManager from '../../utils/webservice_manager';
import Insets from '../../components/common/Insets';
import DetailRenderItem from '../../components/calendar/DetailRenderItem';
import Image from '../../components/common/Image';
import Text from '../../components/common/Text';
import SettingHeader from '../../components/setting/SettingHeader';
import Line from '../../components/common/Line';

import SelectViewTypeModal from './SelectViewTypeModal';

// Constants
import {THEME} from '../../constants/theme';
import Constant from '../../utils/constants';

// Data
import {SafeAreaView} from 'react-native-safe-area-context';

// Images
const SelectIcon = require('../../assets/images/select_icon/select_icon.png');

/*********************************** */
//카렌다에서 날짜를 터치했을 경우 로드되는 클래스
//근무한 직원들의 일, 주, 월 단위로 상세보기
//각 직원당 DetailRenderItem를 클래스 호출(FlatList)
/******************************************** */

export default class ReportDetail extends Component {
  constructor(props) {
    super(props);
    this.date = this.props.route.params.date;
    this.userID = '';
    this.WEEK_START = dayjs(this.date)
      .startOf('week')
      .add(1, 'day')
      .format('YYYY-MM-DD');
    this.WEEK_END = dayjs(this.date)
      .endOf('week')
      .add(1, 'day')
      .format('MM-DD');
    this.MONTH_START = dayjs(this.date).startOf('month').format('YYYY-MM-DD');
    this.MONTH_END = dayjs(this.date).endOf('month').format('MM-DD');
    this.state = {
      viewType: '일',
      modalVisible: false,
      contents: [],
    };

    // console.log('state date=', this.props.route.params.date);
  }

  componentDidMount() {
    Constant.getUserInfo().then(response => {
      this.userID = response.userID;
      this.callGetReportAPI().then(response => {
        console.log('response=', response);
        this.setState({contents: response});
      });
    });
    console.log('디테일 리포트에서 navigation객체 = ',this.props.navigation);
  }

  //일/주/월 버튼 터치시 (선택할 수 있는 모달창 팝업)
  changeViewType = () => {
    this.setState({modalVisible: true});
  };

  //일/주/월 선택 취소
  cancelButtonClicked = () => {
    this.setState({modalVisible: false});
  };

  //일/주/월을 선택한 경우
  okButtonClicked = item => {
    this.setState({viewType: item, modalVisible: false, contents: []}, () => {
      this.callGetReportAPI().then(response => {
        console.log('response=', response);
        this.setState({contents: response});
      });
    });
  };

  //일/주/월에 대한 API 호출
  async callGetReportAPI() {
    let manager;

    if (this.state.viewType == '일')
      manager = new WebServiceManager(Constant.serviceURL +'/GetDailyReport?user_id=' + this.userID +'&day=' +this.date);
    else if (this.state.viewType == '주')
      manager = new WebServiceManager(Constant.serviceURL +'/GetWeeklyReport?user_id=' +this.userID +'&day=' +this.date);
    else
      manager = new WebServiceManager(Constant.serviceURL +'/GetMonthlyReport?user_id=' +this.userID +'&day=' +this.date);

    let response = await manager.start();
    if (response.ok) 
      return response.json();
    else 
      Promise.reject(response);
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Insets>
          <SettingHeader title="업무 캘린더" />
          <FlatList
            ListHeaderComponent={
              <>
                <View style={styles.contentsHeader}>
                  {/* TIP */}
                  <View style={styles.tip}>
                    <View style={styles.tipIcon}>
                      <Text style={styles.tipIconText}>!</Text>
                    </View>
                    <Text style={styles.tipText}>
                      총 금액은 주휴수당을 합한 금액입니다.
                    </Text>
                  </View>

                  {/* Select Date */}
                  <View style={styles.selectDateView}>
                    {/* Selected Date */}
                    <View style={styles.selectedDate}>
                      {this.state.viewType === '일' && (
                        <Text style={styles.selectedDateText} fontWeight={600}>
                          {this.date}
                        </Text>
                      )}
                      {this.state.viewType === '주' && (
                        <Text style={styles.selectedDateText} fontWeight={600}>
                          {this.WEEK_START} ~ {this.WEEK_END}
                        </Text>
                      )}
                      {this.state.viewType === '월' && (
                        <Text style={styles.selectedDateText} fontWeight={600}>
                          {this.MONTH_START} ~ {this.MONTH_END}
                        </Text>
                      )}
                    </View>

                    {/* Select Date Type */}
                    <Pressable
                      style={styles.selectType}
                      onPress={this.changeViewType}>
                      <Text style={styles.typeItemText}>
                        {this.state.viewType}
                      </Text>
                      <Image source={SelectIcon} />
                    </Pressable>
                  </View>
                </View>
                <Line />
              </>
            }
            data={this.state.contents}
            renderItem={({item, index}) => (
              <DetailRenderItem
                item={item}
                index={index}
                date={this.date}
                navigation={this.props.navigation}
                viewType={this.state.viewType}
              />
            )}
            style={{flex: 1}}
            contentContainerStyle={{flexGrow: 1}}
          />
        </Insets>

        {this.state.modalVisible && (
          <SelectViewTypeModal
            navigation={this.props.navigation}
            okButtonClicked={item => this.okButtonClicked(item)}
            cancelButtonClicked={this.cancelButtonClicked}
          />
        )}
      </SafeAreaView>
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    paddingHorizontal: 25,
  },
  screenTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: THEME.COLOR.MAIN_COLOR,
  },
  line: {
    width: '100%',
    height: 1,
    backgroundColor: THEME.COLOR.LIGHT_GRAY,
  },
  contentsHeader: {
    paddingTop: 5,
    paddingBottom: 20,
    paddingHorizontal: 25,
  },
  tip: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tipIcon: {
    width: 15,
    height: 15,
    borderRadius: 9,
    backgroundColor: THEME.COLOR.VIOLET_COLOR,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 6,
  },
  tipIconText: {
    fontSize: 14,
    lineHeight: 16,
    fontWeight: '800',
    color: THEME.COLOR.WHITE_COLOR,
  },
  tipText: {
    fontSize: 13,
    fontWeight: '400',
    color: THEME.COLOR.GRAY_COLOR,
  },
  selectDateView: {
    marginTop: 8,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  selectedDate: {},
  selectedDateText: {
    letterSpacing: -0.2,
    fontSize: 22,
    color: THEME.COLOR.MAIN_COLOR,
  },
  selectType: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderColor: THEME.COLOR.DISABLED_COLOR,
    borderWidth: 1,
    width: 60,
    height: 26,
    paddingHorizontal: 6,
  },
  typeItem: {},
  typeItemText: {
    fontSize: 14,
    fontWeight: '500',
    color: THEME.COLOR.BLACK_COLOR,
  },
});
