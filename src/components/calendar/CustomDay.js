import React, { Component } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import dayjs from 'dayjs';

// Constants
import { THEME } from '../../constants/theme';

// Components
import Text from '../common/Text';

//props 특징
//date : 각 날짜에 대한 객체
//state : 이번달에 속한 날짜인지 (달력에는 저번달에 속한 날짜도 나오는데 저번달이나 다음달에 속한 날짜이면 "disabled"
//오늘날짜에 해당하면 "today" )
//marking : 각 날짜에 찍힐 데이터
export default class CustomDay extends Component {
    constructor(props) {
        super(props);

        //props로 요일계산하고 토,일요일 구분, 각 날짜가 이번달에 속한 날짜인지 판단
        const week = dayjs(this.props.date.dateString).format('ddd');
        //this.date=this.props.date;
        //this.data=this.props.data;
        //this.disabled=this.props.state==='disabled';
        //this.today=this.props.state==='today';
        this.saturday=week==='Sat';
        this.sunday=week==="Sun";
    }

    //달력에서 해당 날짜 클릭시 (알바한 사람이 있을 경우만 이벤트 발생)
    onPressDay=()=> {
        if(this.props.data!=undefined)
            this.props.onDateClickListener(this.props.date.dateString);
        //this.navigation.navigate('Daily', { state: date });
        //onPress(date);
    }

    //하나의 날짜에 표시될 항목(알바한 사람 이름)
    listItem=(item,index)=> {
        const {name} = item;
        const color = CALENDAR_COLORS[index%3];
        return (
            <View
                style={[styles.mark, { backgroundColor: color }]} key={name}>
                <Text style={styles.markText}>{name}</Text>
            </View>
        );
    }

    render() {
       // console.log('date,',this.date)
        //console.log('data',this.data)
        return (
            <Pressable style={styles.dayButton} onPress={()=>this.onPressDay()}>
                {/* Date */}
                <View
                    style={[
                        styles.day,
                        this.props.state==='today' ? styles.today : null,
                        this.props.state==='disabled' ? styles.disabledButton : null,
                    ]}>
                    <Text
                        style={[
                            styles.dayText,
                            this.saturday ? styles.saturdayText : null,
                            this.sunday ? styles.sundayText : null,
                        ]}>
                        {this.props.date.day}
                    </Text>
                </View>
    
                {/* Items */}
                <View style={this.props.state==='disabled' ? { opacity: 0.6 } : null}>
                    {this.props.data?.map((item,index) => this.listItem(item,index))}
                </View>
            </Pressable>
        );
    }
}




// Styles
const CALENDAR_COLORS = ['#E868A0', '#295CC5', '#18ABA1'];

const styles = StyleSheet.create({
    dayButton: {
        width: '100%',
        height: 70,
        borderColor: THEME.COLOR.LIGHT_GRAY,
        borderWidth: 0.5,
        marginTop:-10,
        marginBottom:-6.5,
        backgroundColor:THEME.COLOR.WHITE_COLOR
    },
    disabledButton: {
        opacity: 0.2,
    },
    day: {
        width: 15,
        height: 15,
        borderRadius: 8,
        margin: 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    today: {
        backgroundColor: 'rgba(71, 100, 168, 0.20)',
    },
    dayText: {
        fontSize: 12,
        fontWeight: '600',
        lineHeight: 15,
        color: THEME.COLOR.MAIN_COLOR,
    },
    saturdayText: {
        color: THEME.COLOR.BLUE_COLOR
    },
    sundayText: {
        color:'#ff0000'
    },
    mark: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    markText: {
        fontSize: 12,
        fontWeight: '400',
        color: THEME.COLOR.WHITE_COLOR,
    },
});