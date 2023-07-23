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

const ScreenHeight = Dimensions.get('window').height;
const ScreenWidth = Dimensions.get('window').width;

export default class Calendar extends Component {
    constructor(props) {
        super(props);
        this.AnimatedHeaderValue = new Animated.Value(0);
        this.userID = '';
        this.state = {
            contents: {},
            refreshing: false,
            emptyListViewVisible: false
        }
    }
    onRefresh = () => {
        this.setState({ refreshing: true });
        this.goWorkedList();
        console.log('refreshing complete...') //refresing 할 api넣기
        this.setState({ refreshing: false });
    }

    goWorkedList = () => {
        Constant.getUserInfo().then((response) => {
            this.userID = response.userID;
            const todate = dayjs(new Date()).format('YYYY-MM-DD');
            this.callGetWorkedListAPI(todate).then((response) => {
                this.setState({ contents: response });
            });
        });
    }
    componentDidMount() {
        this.goWorkedList();
    }

    async callGetWorkedListAPI(todate) {
        console.log('userID = ', this.userID);
        let manager = new WebServiceManager(Constant.serviceURL + "/GetWorkedList?user_id=" + this.userID + "&day=" + todate);
        let response = await manager.start();
        if (response.ok)
            return response.json();
        else
            Promise.reject(response);
    }

    onMonthChanged = (date) => {
        console.log('month changed', date);
        this.callGetWorkedListAPI(date.dateString).then((response) => {
            this.setState({ contents: response });
        });
    }

    onDateClicked = (date) => {
        console.log('selected date=', date);
        this.props.navigation.navigate('ReportDetail', { date: date });
    }
    goWorkedList=()=>{
        Constant.getUserInfo().then((response) => {
            this.userID = response.userID;
            const todate = dayjs(new Date()).format('YYYY-MM-DD');
            this.callGetWorkedListAPI(todate).then((response) => {
                this.setState({ contents: response });
            });
        });
    }
    render() {
        const Header_Maximum_Height = ScreenHeight / 800;
        const Header_Minimum_Height = 0;
        return (
            <SafeAreaView style={{ flex: 1 }}>

                {this.state.emptyListViewVisible === false && <ScrollView
                    
                    contentContainerStyle={[ { paddingTop: Header_Maximum_Height + Header_Minimum_Height }]}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    refreshControl={<RefreshControl refreshing={this.state.refreshing} onRefresh={this.onRefresh} />}
                    onScroll={Animated.event(
                        [{ nativeEvent: { contentOffset: { y: this.AnimatedHeaderValue } } }],
                        { useNativeDriver: true })}
                    onRefresh={this.onRefresh}
                >

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
                }

                {this.state.emptyListViewVisible === true && <EmptyListView refreshing={this.state.refreshing} onRefreshListener={this.onRefresh} contentContainerStyle={{ paddingTop: Header_Maximum_Height }} navigation={this.props.navigation} />}

            </SafeAreaView>
        );
    }
}

class EmptyListView extends Component {
    constructor(props) {
        super(props)
        this.state = {
            refreshing: this.props.refreshing
        }
    }
    render() {
        return (
            <View>
                <Text>해당사항 없음</Text>
            </View>
        )
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


