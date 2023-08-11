import React, {Component} from 'react';
import {Dimensions, Pressable, StyleSheet, View} from 'react-native';
import dayjs from 'dayjs';

// Constants
import {THEME} from '../../constants/theme';

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
    this.saturday = week === 'Sat';
    this.sunday = week === 'Sun';
  }

  //달력에서 해당 날짜 클릭시 (알바한 사람이 있을 경우만 이벤트 발생)(상위의 클래스에서 이벤트 발생)
  onPressDay = () => {
    if (this.props.data != undefined)
      this.props.onDateClickListener(this.props.date.dateString);
    //this.navigation.navigate('Daily', { state: date });
    //onPress(date);
  };

  //하나의 날짜에 표시될 항목(알바한 사람 이름)
  listItem = (item, index) => {
    const {name} = item;
    const color = CALENDAR_COLORS[index % 3];
    if (index < 3) {
      return (
        <View
          style={[styles.mark, {backgroundColor: color, flex: 1}]}
          key={name}>
          <Text numberOfLines={1} ellipsizeMode="tail" style={styles.markText}>
            {name}
          </Text>
        </View>
      );
    } else if (index == 3) {
      return (
        <View style={[styles.mark, {height: 10}]} key={name}>
          <Text style={{color: 'black'}}>˙˙˙</Text>
        </View>
      );
    }
  };

  render() {
    return (
      <Pressable style={styles.dayButton} onPress={() => this.onPressDay()}>
        {/* Date */}
        <View
          style={[
            styles.day,
            this.props.state === 'today' ? styles.today : null,
            this.props.state === 'disabled' ? styles.disabledButton : null,
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
        <View style={this.props.state === 'disabled' ? {opacity: 0.6} : null}>
          {this.props.data?.map((item, index) => this.listItem(item, index))}
        </View>
      </Pressable>
    );
  }
}

// Styles
const CALENDAR_COLORS = ['#E868A0', '#295CC5', '#18ABA1'];

const styles = StyleSheet.create({
  dayButton: {
    width: Dimensions.get('window').width / 7,
    minHeight: 86,
    borderColor: THEME.COLOR.LIGHT_GRAY,
    borderWidth: 0.5,
    marginBottom: -15,
  },
  disabledButton: {
    opacity: 0.2,
  },
  day: {
    width: 16,
    height: 16,
    borderRadius: 8,
    marginVertical: 2,
    marginHorizontal: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  today: {
    backgroundColor: 'rgba(71, 100, 168, 0.20)',
  },
  dayText: {
    fontSize: 12,
    fontWeight: '300',
    lineHeight: 15,
    color: THEME.COLOR.BLACK_COLOR,
  },
  saturdayText: {
    color: THEME.COLOR.BLUE_COLOR,
  },
  sundayText: {
    color: '#ff0000',
  },
  mark: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
    paddingVertical: 1,
  },
  markText: {
    fontSize: 12,
    fontWeight: '400',
    color: THEME.COLOR.WHITE_COLOR,
  },
});
