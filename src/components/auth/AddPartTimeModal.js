import React, { Component } from 'react';
import { KeyboardAvoidingView, Pressable, StyleSheet, View, Alert} from 'react-native';
import dayjs from 'dayjs';

// Constants
import { THEME } from '../../constants/theme';

// Components
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
import { numberKeyboardType, onUpdateNumbersOnly } from '../../utils/keyboard';


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

export default class AddPartTimeModal extends Component {
    constructor(props) {
        super(props)

        this.employee=this.props.route.params.data;

        this.state = {
            activeMenu: 'time'
        }
    }

    // 시간등록이냐 보너스 등록이냐... 선택
    onChangeMenu = (key) => {
        this.setState({ activeMenu: key });

        /*     // form 초기화
            setTargetDate(todayStartTime);
            setStartTime(todayStartTime);
            setEndTime(todayStartTime);
            setAmount(''); */
    }
   
    render() {
        return (
            <View style={styles.container}>
                {/* 투명 배경 */}
                <Pressable style={styles.background} onPress={this.props.navigation.goBack} />

                {/* Contents */}
                <View style={styles.contents}>
                    {/* 헤더 */}
                    <View style={styles.header}>
                        {/* Menu Toggle */}
                        <View style={styles.menuToggle}>
                            <Pressable
                                style={[
                                    styles.menu,
                                    this.state.activeMenu === 'time'
                                        ? styles.activeMenu
                                        : null,
                                ]}
                                onPress={() => this.onChangeMenu('time')}>
                                <Text
                                    style={[
                                        styles.menuText,
                                        this.state.activeMenu === 'time'
                                            ? styles.activeMenuText
                                            : null,
                                    ]}>
                                    시간 등록
                                </Text>
                            </Pressable>
                            <Pressable
                                style={[
                                    styles.menu,
                                    this.state.activeMenu === 'bonus'
                                        ? styles.activeMenu
                                        : null,
                                ]}
                                onPress={() => this.onChangeMenu('bonus')}>
                                <Text
                                    style={[
                                        styles.menuText,
                                        this.state.activeMenu === 'bonus'
                                            ? styles.activeMenuText
                                            : null,
                                    ]}>
                                    보너스 등록
                                </Text>
                            </Pressable>
                        </View>

                        <View style={styles.closeButton}>
                            <CloseButton />
                        </View>
                    </View>
                    {this.state.activeMenu == "time" && <TimeMenu employee={this.employee} navigation={this.props.navigation}/>}
                    {this.state.activeMenu == "bonus" && <BonusMenu employee={this.employee} navigation={this.props.navigation}/>}
                </View>
               

            </View>
        )
    }

}

class TimeMenu extends Component {
   
    constructor(props){
        super(props);

        //dsyjs로 생성한 타입은 문자열, new Date()로 생성한 타입은 객체
        //DatePicker에서는 10분단위로 선택할 수 있도록 세팅할것이므로
        //현재 시간을 불러와서 10분단위로 절사
        this.employee=this.props.employee;
        this.today = dayjs();
        const minute = parseInt(this.today.get("minute")/10)*10;
        this.today = this.today.set("minute",minute);    
        
        this.state={
            //targetDate:new Date(dayjs().startOf('day').valueOf()),
            date:this.today,
            //startTime:new Date(dayjs().startOf('time').valueOf()),
            startTime:this.today,
            //endTime:new Date(dayjs().startOf('day').valueOf()),
            endTime:this.today,
            amount:this.employee.pay,
            isVisible:false,
            selectedKind:'date',
        }

    }
    
    onSelectedListener=(value)=>{
        switch (this.state.selectedKind) {
            case 'date':
                this.setState({date:value});
                console.log('case date = ',this.state.date);
                break;
            case 'startTime':
                this.setState({startTime:value});
                break;
            case 'endTime':
                this.setState({endTime:value});
                break;
        }
    }
  
    onCloseModal=()=>{
        this.setState({selectedKind:null,isVisible:false})
    }
    //달력 또는 시간선택 아이콘 버튼을 눌렀을 때
    openDateTimeModal=(value)=>{
        this.setState({selectedKind:value, isVisible:true})
    }

    setAmount=(text)=>{
        this.setState({amount:text})
    }



    onSubmit=()=>{
        this.callAddDailyWorkAPI().then((response)=> {
            console.log('add daily work response = ',response);
            if(response.success==1) {
                Alert.alert('시간등록',response.message);
                this.props.navigation.goBack();
            }
            else {
                Alert.alert('시간등록',response.message);
                this.props.navigation.goBack();
            }
        });
     
    }


    //{"employeeID":2,"startDate":"2023-07-13","startTime":"08:00","endTime":"15:00","pay":10000}
    async callAddDailyWorkAPI() {
        let manager = new WebServiceManager(Constant.serviceURL+"/AddDailyWork","post");

        const formData={
            employeeID:this.employee.id,
            startDate:dayjs(this.state.date).format("YYYY-MM-DD"),
            startTime:dayjs(this.state.startTime).format("HH:mm"),
            endTime:dayjs(this.state.endTime).format("HH:mm"),
            pay:this.state.amount};
            
        manager.addFormData("data",formData);
        
        let response = await manager.start();
        if (response.ok)
            return response.json();
        else
            Promise.reject(response);
    }

    render() {        
        //DatePicker를 클렉시 현재 설정된 값으로 보여줌
        let displayedDate=null;

        if(this.state.selectedKind=='date')
            displayedDate=this.state.date;
        else if(this.state.selectedKind=='startTime')
            displayedDate=this.state.startTime;
        else
            displayedDate=this.state.endTime;

        return (
            <View style={styles.timeAdd}>
                <View style={styles.selectedUserName}>
                    <Text style={styles.userNameText}>{this.employee.name}</Text>
                </View>

                <KeyboardAvoidingView style={styles.form}>
                    <InputBox
                        label='날짜'
                        input={
                            <DateButton
                                key={this.state.date}
                                defaultDate={this.state.date}
                                onPress={() => this.openDateTimeModal('date')}
                            />
                        }
                    />
                    <InputBox
                        label='출근 시간'
                        input={
                            <TimeButton
                                key={this.state.startTime}      //key값이 있으면 DateButton 클래스에서 didMount()다시 실행됨
                                defaultTime={this.state.startTime}
                                onPress={() => this.openDateTimeModal('startTime')}
                            />
                        }
                    />
                    <InputBox
                        label='퇴근 시간'
                        input={
                            <TimeButton
                                key={this.state.endTime}
                                defaultTime={this.state.endTime} 
                                onPress={() => this.openDateTimeModal('endTime')
                                }
                            />
                        }
                    />
                    <InputBox
                        label='금액'
                        input={
                            <Input
                                value={this.state.amount.toString()}
                                onChangeText={(text) => this.setAmount(onUpdateNumbersOnly(text))}
                                keyboardType={numberKeyboardType}
                            />
                        }
                    />
                </KeyboardAvoidingView>
                
                {/* Submit Button */}
                <SubmitButton
                    disabled={!this.state.amount || this.state.startTime > this.state.endTime}
                    onSubmit={()=>this.onSubmit()}
                    label='등록하기'
                />

                {/* Date Picker */}
                {this.state.isVisible && (
                    <DatePicker
                        defaultDate={new Date(displayedDate)}
                        onSelectedListener={(value)=>this.onSelectedListener(value)}
                        mode={this.state.selectedKind=='startTime' || this.state.selectedKind=="endTime" ?'time':'date'}
                        onClose={this.onCloseModal}
                    />
                )}
            </View>
        )
    }
}


class BonusMenu extends Component {
    constructor(props){
        super(props);

        this.employee=this.props.employee;

        this.state={
            defaultDate:new Date(),
            amount:'',
            isVisible:false,
           
        }
    }
    onSubmit=()=>{
        console.log('target',this.state.targetDate)
        console.log('amount',this.state.amount)
    }
    onCloseModal=()=>{
        this.setState({isVisible:false})
    }
    //달력아이콘 버튼을 눌렀을 때
    onOpenModal=()=>{
        this.setState({isVisible:true})
    }

    setAmount=(text)=>{
        this.setState({amount:text})
    }
    render() {
        return (
            <View style={styles.timeAdd}>
                <View style={styles.selectedUserName}>
                    <Text style={styles.userNameText}>{this.employee.name}</Text>
                </View>

                <KeyboardAvoidingView style={styles.form}>
                    <InputBox
                        label='날짜'
                        input={
                            <DateButton
                                key={this.state.defaultDate} //key값이 있으면 DateButton 클래스에서 didMount()다시 실행됨
                                defaultDate={this.state.defaultDate}
                                onPress={() => this.onOpenModal()}
                            />
                        }
                    />
                    <InputBox
                        label='금액'
                        input={
                            <Input
                                value={this.state.amount}
                                onChangeText={(text) =>
                                    this.setAmount(onUpdateNumbersOnly(text))
                                }
                                keyboardType={numberKeyboardType}
                            />
                        }
                    />
                </KeyboardAvoidingView>
                
                {/* Submit Button */}
                <SubmitButton
                    disabled={!this.state.amount || this.state.startTime > this.state.endTime}
                    onSubmit={this.onSubmit}
                    label='등록하기'
                />

                {/* Date Picker */}
                {this.state.isVisible && (
                    <DatePicker
                        defaultDate={this.state.defaultDate}
                        onSelectedListener={(value)=>{this.setState({defaultDate:value})}}
                        mode={'date'}
                        onClose={this.onCloseModal}
                    />
                )}
            </View>
        )
    }
}


// Styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    background: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        backgroundColor: '#000d2915',
    },
    contents: {
        backgroundColor: THEME.COLOR.WHITE_COLOR,
        width: '100%',
        padding: 30,
        paddingBottom: 15,
    },
    closeButton: { position: 'absolute', right: 0 },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    menuToggle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: THEME.COLOR.GHOST_WHITE,
        borderRadius: 20,
        width: 230,
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    menu: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 5,
        backgroundColor: THEME.COLOR.GHOST_WHITE,
        borderRadius: 20,
    },
    activeMenu: {
        backgroundColor: THEME.COLOR.MAIN_COLOR,
    },
    menuText: {
        fontSize: 14,
        fontWeight: '500',
        color: THEME.COLOR.GRAY_COLOR,
    },
    activeMenuText: { color: THEME.COLOR.WHITE_COLOR },
    timeAdd: {
        paddingHorizontal: 30,
    },
    selectedUserName: {
        paddingVertical: 10,
        alignItems: 'center',
    },
    userNameText: {
        fontSize: 21,
        fontWeight: '600',
        color: THEME.COLOR.MAIN_COLOR,
    },
    form: {},
});

