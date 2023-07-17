import { StyleSheet, View, Modal } from 'react-native';
import React, { Component, useState } from 'react';
import RNDatePicker from 'react-native-date-picker';
import dayjs from 'dayjs';
import ModalContainer from '../modal/ModalContainer';


//react-native-date-picker을 이용한 DatePicker에 들어가는 date파라메터는
//기본적으로 new Date()로 생성한 타입이여야 함
//따라서 new Date(dayjs) 타입으로 변환해야 함

export default class DatePicker extends Component {
    constructor(props) {
        super(props);
        this.date=this.props.defaultDate;
        this.mode=this.props.mode;

        this.state={
            selectedDate:this.date
        }

        console.log('today on DatePicker = ',this.date);
    }

    okButtonClicked=()=> {
        console.log('selected date = ',this.state.selectedDate);
        this.props.onSelectedListener(this.state.selectedDate);
        this.props.onClose();
    }

    onClose=()=> {
        this.props.onClose();
    }

    render() {
        return (
            <ModalContainer
                transparent
                onClose={this.onClose}
                buttons={[
                    {
                        id: 0,
                        label: '확인',
                        onPress: () => {this.okButtonClicked()},
                    },
                    {
                        id: 1,
                        label: '취소',
                        onPress: this.onClose,
                    },
                ]}>
                <View style={styles.contents}>
                    <RNDatePicker
                        date={this.state.selectedDate}
                        onDateChange={(value)=>this.setState({selectedDate:value})}
                        mode={this.mode}
                        locale='ko'
                        minuteInterval={10}/>
                </View>    
            </ModalContainer>
        );
    }
}


const styles = StyleSheet.create({
    contents: {
        justifyContent: 'center',
        alignItems: 'center',
    },
});

