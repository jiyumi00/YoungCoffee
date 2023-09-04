import React, {Component} from 'react';
import {
  KeyboardAvoidingView,
  Pressable,
  StyleSheet,
  View,
  Alert,
  Keyboard,
  TouchableWithoutFeedback,
  ScrollView,
  StatusBar
} from 'react-native';
import dayjs from 'dayjs';

// Constants
import {THEME} from '../../constants/theme';
import {CALENDAR_THEME} from '../../constants/calendar';

// Components
import {Calendar as RNCalendar, LocaleConfig} from 'react-native-calendars';
import CloseButton from '../../components/common/CloseButton';
import InputBox from '../../components/common/InputBox';
import DatePicker from '../../components/common/DatePicker';
import Input from '../../components/common/Input';
import DateButton from '../../components/common/DateButton';
import TimeButton from '../common/TimeButton';
import Text from '../../components/common/Text';
import SubmitButton from '../../components/common/SubmitButton';
import Constant from '../../utils/constants';
import WebServiceManager from '../../utils/webservice_manager';

// Utils
import { keyboardBehavior,numberKeyboardType,onUpdateNumbersOnly} from '../../utils/keyboard';
import {amountFormat} from '../../utils/AmountFormat';
import ModalContainer from '../modal/ModalContainer';
import {SafeAreaView} from 'react-native-safe-area-context';

/*
//아르바이트 직원 일한 시간 등록하는 모달
*/

//useNaviagion를 사용하기 위해 클래스를 함수로 Wrap
//클래스에서는 위와 같은 함수를 사용하지 못함
/*
export default function(props) {
    const navigation = useNavigation();
    return <AddPartTimeModal {...props} navigation={navigation}/>;
}*/

export default class AddWorkingTimeModal extends Component {
  constructor(props) {
    super(props);

    this.employee = this.props.route.params.data;

    this.state = {
      activeMenu: 'schedule',
    };
  }

  // 시간등록이냐 보너스 등록이냐... 선택
  onChangeMenu = (menuType) => {
    // if (menuType == 'schedule')
    //   Alert.alert('기능제한', '현재 이 기능은 사용할 수 없습니다');
    // else 
      this.setState({activeMenu: menuType});
  };

  render() {
    const statusBarHeight=StatusBar.currentHeight;
    return (
     
      <KeyboardAvoidingView behavior={keyboardBehavior} style={{flex: 1,}}>
        <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss();}}>
        <ScrollView>
          <View style={{flex: 1, justifyContent: 'flex-end', backgroundColor:'#000d2915',marginTop:statusBarHeight + 20}}>
            {/* <ModalContainer onClose={() => this.props.navigation.goBack()}> */}
            {/* 헤더 */}
            <View style={[styles.header]}>
              {/* Menu Toggle */}
              <View style={styles.menuToggle}>
                <Pressable
                  style={[
                    styles.menu,
                    this.state.activeMenu === 'time' ? styles.activeMenu : null,
                  ]}
                  onPress={() => this.onChangeMenu('time')}>
                  <Text
                    style={[
                      styles.menuText,
                      this.state.activeMenu === 'time' ? styles.activeMenuText: null,]}>
                    일일 등록
                  </Text>
                </Pressable>
                <Pressable
                  style={[
                    styles.menu,
                    this.state.activeMenu === 'schedule' ? styles.activeMenu : null,
                  ]}
                  onPress={() => this.onChangeMenu('schedule')}>
                  <Text
                    style={[
                      styles.menuText,
                      this.state.activeMenu === 'schedule' ? styles.activeMenuText : null,]}
                    fontWeight={600}>
                    스케줄 등록
                  </Text>
                </Pressable>
              </View>

              <View style={styles.closeButton}>
                <CloseButton />
              </View>
            </View>
          
            {/* Contents */}
            <View style={styles.contents}>
              {/* </ModalContainer> */}
              {this.state.activeMenu == 'time' && (
                <TimeMenu
                  employee={this.employee}
                  navigation={this.props.navigation}
                />
              )}
              {this.state.activeMenu == 'schedule' && (
                <ScheduleMenu
                  employee={this.employee}
                  navigation={this.props.navigation}
                />
              )}
            </View>
          
            {/* </ModalContainer> */}
          </View>
          </ScrollView>
        </TouchableWithoutFeedback>
        
      </KeyboardAvoidingView>
    
    );
  }
}

class TimeMenu extends Component {
  constructor(props) {
    super(props);

    //dsyjs로 생성한 타입은 문자열, new Date()로 생성한 타입은 객체
    //DatePicker에서는 10분단위로 선택할 수 있도록 세팅할것이므로
    //현재 시간을 불러와서 10분단위로 절사
    this.employee = this.props.employee;
    this.today = dayjs();
    const minute = parseInt(this.today.get('minute') / 10) * 10;
    this.today = this.today.set('minute', minute);

    this.state = {
      isValidForm: false,
      date: this.today,
      startTime: this.today,
      endTime: this.today,
      pay: this.employee.pay,
      displayedPay: amountFormat(this.employee.pay),
      isVisible: false,
      selectedKind: 'date',
    };
  }

  onSelectedListener = value => {
    switch (this.state.selectedKind) {
      case 'date':
        this.setState({date: value},()=> {
          this.onValidForm();
        });
        //console.log('case date = ', this.state.date);
        break;
      case 'startTime':
        this.setState({startTime: value}, () => {
          this.onValidForm();
        });
        break;
      case 'endTime':
        this.setState({endTime: value}, () => {
          this.onValidForm();
        });
        break;
    }
  };

  //시급이 <=0 또는 endTime이 작거나 같음 또는 startDate가 오늘날짜보다 크면 등록버튼 비활성화
  onValidForm = () => {
    let isValidForm = true;
    console.log('날짜 변경 = ', this.state.startTime, this.state.endTime);

    if (parseInt(this.state.pay) <= 0 || this.state.pay.length == 0 || isNaN(this.state.pay))
      isValidForm = false;
    if (dayjs(this.state.startTime).format('HH:mm') >= dayjs(this.state.endTime).format('HH:mm'))
      isValidForm = false;
    if(dayjs(this.state.date).format("YYYY-MM-DD") > dayjs().format("YYYY-MM-DD"))
      isValidForm = false;
    this.setState({isValidForm: isValidForm});
  };

  onCloseModal = () => {
    this.setState({selectedKind: null, isVisible: false});
  };

  //달력 또는 시간선택 아이콘 버튼을 눌렀을 때
  openDateTimeModal = value => {
    // (희애) 키보드가 켜져있을 경우 닫기
    Keyboard.dismiss();
    this.setState({selectedKind: value, isVisible: true});
  };

  setAmount = value => {
    this.setState({pay: parseInt(value), displayedPay: value}, () => {
      this.onValidForm();
    });
  };

  //금액의 숫자를 , 를 넣은 문자열로 변환
  numberToString = () => {
    this.setState({displayedPay: amountFormat(this.state.pay)});
  };

  //,가 있는 금액을 숫자로 변환
  stringToNumber = () => {
    this.setState({displayedPay: this.state.pay});
  };

  onSubmit = () => {
    this.callAddDailyWorkAPI().then(response => {
      //console.log('add daily work response = ', response);
      Alert.alert('시간등록', response.message);
      if (response.success == 1)      
        this.props.navigation.goBack();
    });
  };

  //{"employeeID":2,"startDate":"2023-07-13","startTime":"08:00","endTime":"15:00","pay":10000}
  async callAddDailyWorkAPI() {
    let manager = new WebServiceManager(Constant.serviceURL + '/AddDailyWork','post');

    const formData = {
      employeeID: this.employee.id,
      startDate: dayjs(this.state.date).format('YYYY-MM-DD'),
      startTime: dayjs(this.state.startTime).format('HH:mm'),
      endTime: dayjs(this.state.endTime).format('HH:mm'),
      pay: this.state.pay,
    };

    manager.addFormData('data', formData);

    let response = await manager.start();
    if (response.ok) 
      return response.json();
    else 
      Promise.reject(response);
  }

  render() {
    //DatePicker를 클렉시 현재 설정된 값으로 보여줌
    let displayedDate = null;

    if (this.state.selectedKind == 'date') displayedDate = this.state.date;
    else if (this.state.selectedKind == 'startTime')
      displayedDate = this.state.startTime;
    else displayedDate = this.state.endTime;

    return (
      <>
        <View style={[styles.timeAdd]}>
          <View style={styles.selectedUserName}>
            <Text style={styles.userNameText} fontWeight={700}>
              {this.employee.name}
            </Text>
          </View>

          <View style={styles.form}>
            <InputBox
              label="날짜"
              input={
                <DateButton
                  key={this.state.date}
                  defaultDate={this.state.date}
                  onPress={() => this.openDateTimeModal('date')}
                />
              }
            />
            <InputBox
              label="출근 시간"
              input={
                <TimeButton
                  key={this.state.startTime} //key값이 있으면 DateButton 클래스에서 didMount()다시 실행됨
                  defaultTime={this.state.startTime}
                  onPress={() => this.openDateTimeModal('startTime')}
                />
              }
            />
            <InputBox
              label="퇴근 시간"
              input={
                <TimeButton
                  key={this.state.endTime}
                  defaultTime={this.state.endTime}
                  onPress={() => this.openDateTimeModal('endTime')}
                />
              }
            />
            <InputBox
              label="금액"
              input={
                <Input
                  value={this.state.displayedPay.toString()}
                  onChangeText={value => this.setAmount(value)}
                  onBlur={this.numberToString}
                  onFocus={this.stringToNumber}
                  keyboardType={numberKeyboardType}
                />
              }
            />
          </View>
        </View>

        {/* Submit Button */}
        <SubmitButton
          disabled={!this.state.isValidForm}
          onSubmit={() => this.onSubmit()}
          label="등록하기"
        />

        {/* Date Picker */}
        {this.state.isVisible && (
          <DatePicker
            defaultDate={new Date(displayedDate)}
            onSelectedListener={value => this.onSelectedListener(value)}
            mode={
              this.state.selectedKind == 'startTime' ||
              this.state.selectedKind == 'endTime'
                ? 'time'
                : 'date'
            }
            onClose={this.onCloseModal}
          />
        )}
      </>
    );
  }
}



class ScheduleMenu extends Component {
  constructor(props) {
    super(props);

    //dsyjs로 생성한 타입은 문자열, new Date()로 생성한 타입은 객체
    //DatePicker에서는 10분단위로 선택할 수 있도록 세팅할것이므로
    //현재 시간을 불러와서 10분단위로 절사
    this.employee = this.props.employee;
    this.today = dayjs();
    const minute = parseInt(this.today.get('minute') / 10) * 10;
    this.today = this.today.set('minute', minute);

    this.selectedDays=[];

    this.state = {
      isValidForm: false,
      startTime: this.today,
      endTime: this.today,
      pay: this.employee.pay,
      displayedPay: amountFormat(this.employee.pay),
      isVisible: false,
      selectedKind: 'startTime',

      selectedDays:{}
    };
  }

  onSelectedListener = value => {
    switch (this.state.selectedKind) {
      case 'startTime':
        this.setState({startTime: value}, () => {
          this.onValidForm();
        });
        break;
      case 'endTime':
        this.setState({endTime: value}, () => {
          this.onValidForm();
        });
        break;
    }
  };

  //카렌다에서 날짜는 선택하면 날짜를 리스트에 저장하고 
  //RNCalendar에서 보여지는 객체로 별도 생성
  onDayPress=(day)=> {
    //console.log('선택된 날짜는 = ',day.dateString);
    const index=this.selectedDays.indexOf(day.dateString);
    if(index==-1)
      this.selectedDays.push(day.dateString);
    else
      this.selectedDays.splice(index,1);

    let markedData = new Map();
    this.selectedDays.map((item)=>{
      markedData.set(item,{selected: true, selectedColor: 'blue'});
    });
    //console.log('선택된 날짜들 객체는 = ',this.selectedDays);
    this.setState({selectedDays:Object.fromEntries(markedData)});
    this.onValidForm();
  }

  //시급이 <=0 또는 endTime이 작거나 같음 또는 startDate가 오늘날짜보다 크면 등록버튼 비활성화
  onValidForm = () => {
    let isValidForm = true;
    //console.log('날짜 변경 = ', this.state.startTime, this.state.endTime);

    if (parseInt(this.state.pay) <= 0 || this.state.pay.length == 0 || isNaN(this.state.pay))
      isValidForm = false;
    if (dayjs(this.state.startTime).format('HH:mm') >= dayjs(this.state.endTime).format('HH:mm'))
      isValidForm = false;
    if(this.selectedDays.length<1)
      isValidForm = false;
    this.setState({isValidForm: isValidForm});
  };

  onCloseModal = () => {
    this.setState({selectedKind: null, isVisible: false});
  };

  //달력 또는 시간선택 아이콘 버튼을 눌렀을 때
  openDateTimeModal = value => {
    Keyboard.dismiss();
    this.setState({selectedKind: value, isVisible: true});
  };

  setAmount = value => {
    this.setState({pay: parseInt(value), displayedPay: value}, () => {
      this.onValidForm();
    });
  };

  //금액의 숫자를 , 를 넣은 문자열로 변환
  numberToString = () => {
    this.setState({displayedPay: amountFormat(this.state.pay)});
  };

  //,가 있는 금액을 숫자로 변환
  stringToNumber = () => {
    this.setState({displayedPay: this.state.pay});
  };

  onSubmit = () => {
    this.callAddDailyWorkScheduleAPI().then(response => {
      //console.log('add daily work response = ', response);
      Alert.alert('시간등록', response.message);
      if (response.success > 0)      
        this.props.navigation.goBack();
    });
  };

  //[{"employeeID":2,"startDate":"2023-07-13","startTime":"08:00","endTime":"15:00","pay":10000},
  //{"employeeID":2,"startDate":"2023-07-14","startTime":"08:00","endTime":"15:00","pay":10000}]
  async callAddDailyWorkScheduleAPI() {
    let manager = new WebServiceManager(Constant.serviceURL + '/AddDailyWorkSchedule','post');

    let formData=[];
    this.selectedDays.map((item)=> {
      formData.push({
          startDate: item,
          employeeID: this.employee.id,
          startTime: dayjs(this.state.startTime).format('HH:mm'),
          endTime: dayjs(this.state.endTime).format('HH:mm'),
          pay: this.state.pay}
      )
    });
   
    manager.addFormData('data', formData);

    let response = await manager.start();
    if (response.ok) 
      return response.json();
    else 
      Promise.reject(response);
  }

  render() {
    //DatePicker를 클렉시 현재 설정된 값으로 보여줌
    let displayedDate = null;

    if (this.state.selectedKind == 'startTime')
      displayedDate = this.state.startTime;
    else displayedDate = this.state.endTime;

    return (
      <>
        <View style={[styles.timeAdd]}>
          <View style={styles.selectedUserName}>
            <Text style={styles.userNameText} fontWeight={700}>
              {this.employee.name}
            </Text>
          </View>

          <RNCalendar
            markedDates={this.state.selectedDays}
            onDayPress={(day)=> this.onDayPress(day)}
            style={{
              border: 'none',
              borderColor: THEME.COLOR.LIGHT_GRAY,
              borderBottomWidth: Platform.OS === 'android' ? 0.8 : null, // 안드로이드에서 바닥에 선이 안보이는 문제 해결
            }}
            enableSwipeMonths // swipe로 휠로 이동하기
            theme={CALENDAR_THEME} // 헤더 부분 스타일 설정하기
            //renderHeader={date => <CustomHeader date={date} />}
            //hideDayNames
            //renderArrow={direction => <CustomArrow direction={direction} />}
          />

          <View style={styles.form}>
            <InputBox
              label="출근 시간"
              input={
                <TimeButton
                  key={this.state.startTime} //key값이 있으면 DateButton 클래스에서 didMount()다시 실행됨
                  defaultTime={this.state.startTime}
                  onPress={() => this.openDateTimeModal('startTime')}
                />
              }
            />
            <InputBox
              label="퇴근 시간"
              input={
                <TimeButton
                  key={this.state.endTime}
                  defaultTime={this.state.endTime}
                  onPress={() => this.openDateTimeModal('endTime')}
                />
              }
            />
            <InputBox
              label="금액"
              input={
                <Input
                  value={this.state.displayedPay.toString()}
                  onChangeText={value => this.setAmount(value)}
                  onBlur={this.numberToString}
                  onFocus={this.stringToNumber}
                  keyboardType={numberKeyboardType}
                />
              }
            />
          </View>
        </View>

        {/* Submit Button */}
        <SubmitButton
          disabled={!this.state.isValidForm}
          onSubmit={() => this.onSubmit()}
          label="등록하기"
        />

        {/* Date Picker */}
        {this.state.isVisible && (
          <DatePicker
            defaultDate={new Date(displayedDate)}
            onSelectedListener={value => this.onSelectedListener(value)}
            mode={'time'}
            onClose={this.onCloseModal}
          />
        )}
      </>
    );
  }
}


//아르바이트 직원 보너스 등록(사용안함)
// class BonusMenu extends Component {
//   constructor(props) {
//     super(props);

//     this.employee = this.props.employee;

//     this.state = {
//       defaultDate: new Date(),
//       amount: '',
//       isVisible: false,
//     };
//   }
//   onSubmit = () => {
//     console.log('target', this.state.targetDate);
//     console.log('amount', this.state.amount);
//   };
//   onCloseModal = () => {
//     this.setState({isVisible: false});
//   };
//   //달력아이콘 버튼을 눌렀을 때
//   onOpenModal = () => {
//     this.setState({isVisible: true});
//   };

//   setAmount = text => {
//     this.setState({amount: text});
//   };
//   render() {
//     return (
//       <View style={styles.timeAdd}>
//         <View style={styles.selectedUserName}>
//           <Text style={styles.userNameText}>{this.employee.name}</Text>
//         </View>

//         <KeyboardAvoidingView style={styles.form}>
//           <InputBox
//             label="날짜"
//             input={
//               <DateButton
//                 key={this.state.defaultDate} //key값이 있으면 DateButton 클래스에서 didMount()다시 실행됨
//                 defaultDate={this.state.defaultDate}
//                 onPress={() => this.onOpenModal()}
//               />
//             }
//           />
//           <InputBox
//             label="금액"
//             input={
//               <Input
//                 value={this.state.amount}
//                 onChangeText={text => this.setAmount(onUpdateNumbersOnly(text))}
//                 keyboardType={numberKeyboardType}
//               />
//             }
//           />
//         </KeyboardAvoidingView>

//         {/* Submit Button */}
//         <SubmitButton
//           disabled={
//             !this.state.amount || this.state.startTime > this.state.endTime
//           }
//           onSubmit={this.onSubmit}
//           label="등록하기"
//         />

//         {/* Date Picker */}
//         {this.state.isVisible && (
//           <DatePicker
//             defaultDate={this.state.defaultDate}
//             onSelectedListener={value => {
//               this.setState({defaultDate: value});
//             }}
//             mode={'date'}
//             onClose={this.onCloseModal}
//           />
//         )}
//       </View>
//     );
//   }
// }

// Styles
const styles = StyleSheet.create({
  contents: {
    backgroundColor: THEME.COLOR.WHITE_COLOR,
    width: '100%',
  },
  closeButton: {position: 'absolute', right: 30, top: 25},
  header: {
    
    paddingTop: 25,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor:'white',//
    paddingBottom:10,
    //marginBottom: 10,//
  },
  menuToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: THEME.COLOR.GHOST_WHITE,
    borderRadius: 20,
    width: 220,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  menu: {
    flex: 1,
    height: 28,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: THEME.COLOR.GHOST_WHITE,
    borderRadius: 30,
  },
  activeMenu: {
    backgroundColor: THEME.COLOR.MAIN_COLOR,
  },
  menuText: {
    fontSize: 15,
    fontWeight: '600',
    color: THEME.COLOR.GRAY_COLOR,
  },
  activeMenuText: {color: THEME.COLOR.WHITE_COLOR},
  timeAdd: {
    paddingHorizontal: 40,
  },
  selectedUserName: {
    paddingVertical: 14,
    alignItems: 'center',
  },
  userNameText: {
    fontSize: 21,
    color: THEME.COLOR.MAIN_COLOR,
  },
  form: {
    paddingTop:15,
    borderTopColor:THEME.COLOR.LIGHT_GRAY,
    borderTopWidth:1,
  },
});
