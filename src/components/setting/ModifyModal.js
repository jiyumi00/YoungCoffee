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


export default class ModifyModal extends Component {
    constructor(props) {
        super(props);

        this.modalButtons=[
            {
                id:1,
                label: '취소',
                onPress: this.cancelButtonClicked,
            },
            {
                id:2,
                label: '변경',
                onPress: () => {
                    this.okButtonClicked()
                },
            },
        ];

        this.state={
            amount:9620,
            targetDate:new Date(dayjs().startOf('day').valueOf())
        }
        this.kind=this.props.route.params.kind;
    }


    cancelButtonClicked=()=> {
        console.log('cancel button clicked...');
        this.props.navigation.goBack();
    }

    okButtonClicked() {
        console.log('ok button clicked...');
        this.props.navigation.goBack();
    }

    render() {        
        return (
            <ModalContainer onClose={()=>this.cancelButtonClicked()} buttons={this.modalButtons}>
                <View style={styles.contents}>
                    {this.kind === 'phoneNumber' && (
                       this.phoneNumberEdit())}
    
                    {this.kind === 'salary' && (
                        this.salaryEdit())}
    
                    {this.kind === 'activation' && (
                        this.activationEdit())}
                </View>
            </ModalContainer>
        );
    }

    phoneNumberEdit=()=> {
        return (
            <>
                <View style={styles.header}>
                    <Text style={styles.titleText}>연락처 변경</Text>
                </View>
                <InputBox label='연락처' input={<Input />} />
            </>
        );
    }

    salaryEdit=()=> {
        return(
            <>
                <View style={styles.header}>
                    <Text style={styles.titleText}>시급 변경</Text>
                </View>
                <InputBox
                    label='날짜'
                    input={
                        <DateButton
                            selectedValue={this.state.targetDate}
                            onPress={() => {}}
                        />
                    }
                />
                <InputBox
                    label='금액'
                    input={
                        <Input
                            value={this.state.amount.toString()}
                            onChangeText={text =>
                                this.setState({amount:onUpdateNumbersOnly(text)})
                            }
                        />
                    }
                />
            </>
        );
    }

    activationEdit=()=> {
        return(
            <View style={styles.messageBox}>
                <Text style={styles.messageText}>
                    박바바 직원의 상태를
                </Text>
                <Text style={styles.messageText}>
                    <Text style={styles.messagePointText}>
                        비활성화
                    </Text>
                    하시겠습니까?
                </Text>
            </View>
        )
    }
}
