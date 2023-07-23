import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import dayjs from 'dayjs';

// Components
import ModalContainer from '../../components/modal/ModalContainer';
import InputBox from '../../components/common/InputBox';
import Input from '../../components/common/Input';
import DateButton from '../../components/common/DateButton';
import Text from '../../components/common/Text';

// Constants
import { THEME } from '../../constants/theme';
import { onUpdateNumbersOnly } from '../../utils/keyboard';



/**
 * @title 직원 정보 수정 팝업
 * @description
 * - changeItem : "phoneNumber" | "salary" | "activation"
 * @returns
 */

 export default class ModifySalaryModal extends Component {
    constructor(props) {
        super(props);
        this.today = dayjs();
        const minute = parseInt(this.today.get("minute") / 10) * 10;
        this.today = this.today.set("minute", minute);

        this.selectedKind = 'date';
        this.modalButtons = [
            {
                id: 1,
                label: '취소',
                onPress: this.cancelButtonClicked,
            },
            {
                id: 2,
                label: '변경',
                onPress: () => {
                    this.okButtonClicked()
                },
            },
        ];

        this.title = this.props.title;
        this.state = {
            amount: this.props.data,
            //targetDate: new Date(dayjs().startOf('day').valueOf()),
            date: this.today,
            isVisible: false,
        }
    }


    cancelButtonClicked = () => {
        console.log('cancel button clicked...');
        this.props.cancelButtonListener();
        //this.props.navigation.goBack();
    }

    okButtonClicked = () => {
        console.log('ok button clicked...');
        this.props.okButtonListener(this.state.amount);
        //this.props.route.params.onResultListener(this.state.amount);
        //this.props.navigation.goBack();
    }
    
    //date하나밖에 없기때문에 바로 this.state.date에다가 넣음
    onSelectedListener = (value) => {
        this.setState({ date: value });
        console.log('case date = ', this.state.date);
    }
    onCloseModal = () => {
        this.setState({ isVisible: false })
    }
    //달력 또는 시간선택 아이콘 버튼을 눌렀을 때
    openDateTimeModal = () => {
        this.setState({ isVisible: true })
    }
    render() {
        let displayedDate = null;

        if (this.selectedKind == 'date')
            displayedDate = this.state.date;

        return (
            <>
                <ModalContainer onClose={this.cancelButtonClicked} buttons={this.modalButtons}>
               
                    <View style={styles.contents}>
                        <View style={styles.header}>
                            <Text style={styles.titleText}>{this.title} 변경</Text>
                        </View>
                        <InputBox
                            label='날짜'
                            input={
                                <DateButton
                                    key={this.state.date}
                                    defaultDate={this.state.date}
                                    onPress={() => this.openDateTimeModal('date')}
                                />
                            } />
                        <InputBox
                            label='금액'
                            input={<Input defaultValue={this.state.amount.toString()} onChangeText={(value) => this.setState({ amount: value })} />} />
                    </View>
                   
                </ModalContainer>
                {this.state.isVisible && (
                    <DatePicker
                        defaultDate={new Date(displayedDate)}
                        onSelectedListener={(value) => this.onSelectedListener(value)}
                        mode={this.selectedKind}
                        onClose={this.onCloseModal}
                        style={styles.datePicker}
                    />
                )}
            </>
        );
    }
}



// Styles
const styles = StyleSheet.create({
    contents: {
        paddingVertical: 20,
        paddingHorizontal: 35,
        position:'relative'
    },
    header: {
        marginBottom: 6,
    },
    titleText: {
        textAlign: 'center',
        fontSize: 16,
        fontWeight: '600',
        color: THEME.COLOR.VIOLET_COLOR,
    },
    messageBox: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 15,
    },
    messageText: {
        fontSize: 17,
        marginBottom: 5,
        fontWeight: '500',
        color: THEME.COLOR.MAIN_COLOR,
    },
    messagePointText: {
        fontSize: 17,
        fontWeight: '600',
        color: THEME.COLOR.VIOLET_COLOR,
    },
    datePicker:{
        zIndex:10,
        bottom:0,
        position:'absolute'
    }
});
