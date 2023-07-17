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

// Styles
const styles = StyleSheet.create({
    contents: {
        paddingVertical: 20,
        paddingHorizontal: 35,
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
});


/**
 * @title 직원 정보 수정 팝업
 * @description
 * - changeItem : "phoneNumber" | "salary" | "activation"
 * @returns
 */


export default class ModifyPhoneModal extends Component {
    constructor(props) {
        super(props);

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

        //this.state={phoneNumber:this.props.route.params.data}
        this.state = {
            phoneNumber: this.props.data
        }
    }


    cancelButtonClicked = () => {
        console.log('cancel button clicked...');
        this.props.cancelButtonListener();
        //this.props.navigation.goBack();
    }

    okButtonClicked = () => {
        console.log('ok button clicked...');
        this.props.okButtonListener(this.state.phoneNumber);
        //this.props.route.params.onResultListener(this.state.phoneNumber);
        //this.props.navigation.goBack();
    }

    render() {
        return (
            <ModalContainer onClose={this.cancelButtonClicked} buttons={this.modalButtons}>
                <View style={styles.contents}>
                    <View style={styles.header}>
                        <Text style={styles.titleText}>연락처 변경</Text>
                    </View>
                    <InputBox label='연락처' input={<Input defaultValue={this.state.phoneNumber} onChangeText={(value) => this.setState({ phoneNumber: value })} />} />
                </View>
            </ModalContainer>
        );
    }
}