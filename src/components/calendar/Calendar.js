import React, { Component } from 'react';
import { ScrollView, StyleSheet, View, SafeAreaView, RefreshControl, Dimensions, Animated, FlatList } from 'react-native';

import { Calendar as RNCalendar, LocaleConfig } from 'react-native-calendars';
import dayjs from 'dayjs';
import { THEME } from '../../constants/theme';

// Components
import CustomDay from './CustomDay';
import CustomHeader from './CustomHeader';
import WebServiceManager from '../../utils/webservice_manager';

// Constants
import { CommonActions } from '@react-navigation/native';
import Constant from '../../utils/constants';


export default class Calendar extends Component {
    constructor(props) {
        super(props);
        this.userID = '';
        this.state = {
            date:dayjs(new Date()).format("YYYY-MM-DD"),
            contents: {},
            refreshing: false,
        }
    }

    componentDidMount() {
        this.goWorkedList(this.state.date);
    }

    //카렌다를 아래로 쓸면...
    onRefresh = () => {
        this.setState({ refreshing: true });
        this.goWorkedList(this.state.date);
        this.setState({refreshing:false});
    }

    //해당월에 일한 불러오기
    goWorkedList = (date) => {
        Constant.getUserInfo().then((response) => {
            this.userID = response.userID;
            this.callGetWorkedListAPI(date).then((response) => {
                this.setState({ contents: response});
            });
        });
    }

    //월 변경시
    onMonthChanged = (date) => {
        this.setState({date:date.dateString},()=> {
            this.goWorkedList(this.state.date);
        });
    }

    //날짜 선택시
    onDateClicked = (date) => {
        this.props.navigation.navigate('ReportDetail', { date: date });
    }

    async callGetWorkedListAPI(todate) {
        let manager = new WebServiceManager(Constant.serviceURL + "/GetWorkedList?user_id=" + this.userID + "&day=" + todate);
        let response = await manager.start();
        if (response.ok)
            return response.json();
        else
            Promise.reject(response);
    }


    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
             <ScrollView
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    refreshControl={<RefreshControl refreshing={this.state.refreshing} onRefresh={this.onRefresh} />}>
                    <RNCalendar
                        markedDates={this.state.contents}
                        style={{ border: 'none' }}
                        //current={'2023-06-01'}
                        enableSwipeMonths // swipe로 휠로 이동하기
                        theme={{ arrowColor: THEME.COLOR.VIOLET_COLOR }}
                        onMonthChange={(date) => this.onMonthChanged(date)}
                        //hideArrows
                        //각 날짜만큼 반복
                        dayComponent={({ date, state, marking }) =>
                            <CustomDay date={date} state={state} data={marking} onDateClickListener={(date) => this.onDateClicked(date)} />}
                        renderHeader={(date) => <CustomHeader date={date} />}
                    //hideDayNames
                    />
                </ScrollView>
            </SafeAreaView>
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


