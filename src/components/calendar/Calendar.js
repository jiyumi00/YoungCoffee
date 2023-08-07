import React, {Component} from 'react';
import {ScrollView, View, RefreshControl, Platform} from 'react-native';
import {Calendar as RNCalendar, LocaleConfig} from 'react-native-calendars';
import dayjs from 'dayjs';

// Components
import CustomDay from './CustomDay';
import CustomHeader from './CustomHeader';
import CustomArrow from './CustomArrow';

// Utils
import WebServiceManager from '../../utils/webservice_manager';
import Constant from '../../utils/constants';
import {CALENDAR_THEME} from '../../constants/calendar';
import {THEME} from '../../constants/theme';

export default class Calendar extends Component {
  constructor(props) {
    super(props);
    this.userID = '';
    this.state = {
      date: dayjs(new Date()).format('YYYY-MM-DD'),
      contents: {},
      refreshing: false,
    };
  }

  componentDidMount() {
    this.goWorkedList(this.state.date);
  }

  //카렌다를 아래로 쓸면...
  onRefresh = () => {
    this.setState({refreshing: true});
    this.goWorkedList(this.state.date);
    this.setState({refreshing: false});
  };

  //해당월에 일한 목록 불러오기
  goWorkedList = date => {
    // (희애) 이전 달의 데이터도 가져와야하기 때문에 우선 적으로 프론트에서 2번 요청 보내는 형식으로 처리
    Constant.getUserInfo()
      .then(response => {
        // 유저 아이디
        this.userID = response.userID;

        // 이전 달 날짜
        const prevMonthDate = dayjs(date).subtract(1, 'M').format('YYYY-MM-DD');
        const nextMonthDate = dayjs(date).add(1, 'M').format('YYYY-MM-DD');

        // 이전 달, 이번 달, 다음 달 데이터 요청
        return new Promise.all([
          this.callGetWorkedListAPI(prevMonthDate),
          this.callGetWorkedListAPI(date),
          this.callGetWorkedListAPI(nextMonthDate),
        ]);
      })
      .then(response => {
        // 순서는 요청 보낸 순서대로 배열에 저장됨
        this.setState({
          contents: Object.assign(...response),
        });
      })
      .catch(error => {
        console.error('선택한 달의 일한 직원 목록 가져오기 API 실패', error);
      });
  };

  //월 변경시
  onMonthChanged = date => {
    this.setState({date: date.dateString}, () => {
      this.goWorkedList(this.state.date);
    });
  };

  //날짜 선택시
  onDateClicked = date => {
    this.props.navigation.navigate('ReportDetail', {date});
  };

  async callGetWorkedListAPI(todate) {
    let manager = new WebServiceManager(
      Constant.serviceURL +
        '/GetWorkedList?user_id=' +
        this.userID +
        '&day=' +
        todate,
    );
    let response = await manager.start();
    if (response.ok) return response.json();
    else Promise.reject(response);
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this.onRefresh}
            />
          }>
          <RNCalendar
            markedDates={this.state.contents}
            style={{
              border: 'none',
              borderColor: THEME.COLOR.LIGHT_GRAY,
              borderBottomWidth: Platform.OS === 'android' ? 0.8 : null, // 안드로이드에서 바닥에 선이 안보이는 문제 해결
            }}
            enableSwipeMonths // swipe로 휠로 이동하기
            theme={CALENDAR_THEME} // 헤더 부분 스타일 설정하기
            onMonthChange={date => this.onMonthChanged(date)}
            //hideArrows
            //각 날짜만큼 반복
            dayComponent={({date, state, marking}) => (
              <CustomDay
                date={date}
                state={state}
                data={marking}
                thisMonth={this.state.date}
                onDateClickListener={date => this.onDateClicked(date)}
              />
            )}
            renderHeader={date => <CustomHeader date={date} />}
            //hideDayNames
            // (희애) ios, android arrow 통일 시키기
            renderArrow={direction => <CustomArrow direction={direction} />}
          />
        </ScrollView>
      </View>
    );
  }
}

LocaleConfig.locales.kr = {
  monthNames: [
    '1월',
    '2월',
    '3월',
    '4월',
    '5월',
    '6월',
    '7월',
    '8월',
    '9월',
    '10월',
    '11월',
    '12월',
  ],
  monthNamesShort: [
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10',
    '11',
    '12',
  ],
  dayNames: [
    '일요일',
    '월요일',
    '화요일',
    '수요일',
    '목요일',
    '금요일',
    '토요일',
  ],
  dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
  today: '오늘',
};
LocaleConfig.defaultLocale = 'kr';
