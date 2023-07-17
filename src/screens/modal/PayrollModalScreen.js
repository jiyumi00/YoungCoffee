import React, { useState, useEffect } from 'react';
import {
    StyleSheet,
    View,
    KeyboardAvoidingView,
    Pressable,
    TextInput,
} from 'react-native';
import dayjs from 'dayjs';

// Components
import ModalContainer from '../../components/modal/ModalContainer';
import Image from '../../components/common/Image';
import DatePicker from '../../components/common/DatePicker';
import Text from '../../components/common/Text';

// Constants
import { THEME } from '../../constants/theme';

// Utils
import { numberKeyboardType, onUpdateNumbersOnly } from '../../utils/keyboard';

// Images
const TimeIcon = require('../../assets/images/time_icon/time_icon.png');

// Styles
const styles = StyleSheet.create({
    contents: {
        padding: 15,
    },
    header: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 25,
    },
    headerText: {
        fontSize: 16,
        fontWeight: '500',
        color: THEME.COLOR.MAIN_COLOR,
        lineHeight: 26,
    },
    headerPointText: {
        fontSize: 16,
        fontWeight: '500',
        color: THEME.COLOR.VIOLET_COLOR,
    },
    form: {
        paddingHorizontal: 30,
    },
    inputBox: {
        marginBottom: 25,
    },
    label: {
        marginBottom: 3,
    },
    labelText: {
        fontSize: 14,
        fontWeight: '500',
        color: THEME.COLOR.SUB_COLOR,
    },
    input: {
        flex: 1,
        height: 42,
        borderColor: THEME.COLOR.LIGHT_GRAY,
        borderWidth: 1,
        borderRadius: 2,
        paddingHorizontal: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontFamily: 'Pretendard-Regular',
        fontSize: 16,
        fontWeight: '600',
    },
    timeText: {
        fontSize: 16,
        fontWeight: '500',
        lineHeight: 18,
        color: THEME.COLOR.BLACK_COLOR,
    },
});

/**
 * @title 정산 급여 수정 모달
 * @returns
 */
function PayrollModal({ navigation, route }) {
    const [startTime, setStartTime] = useState(new Date());
    const [endTime, setEndTime] = useState(new Date());
    const [selectedTime, setSelectedTime] = useState(null); // start | end
    const [newSum, setNewSum] = useState('');

    const { data } = route.params;

    const onClose = () => {
        navigation.goBack();
    };

    const onUpdateValue = () => {
        onClose();
    };

    // DatePicker 닫기
    const onCloseDatePicker = () => setSelectedTime(null);

    // 새로운 금액 인풋 업데이트
    const handleNumericInputChange = text =>
        setNewSum(onUpdateNumbersOnly(text));

    useEffect(() => {
        setStartTime(data.startTime);
        setEndTime(data.endTime);
    }, [data.startTime, data.endTime]);

    return (
        <>
            <ModalContainer
                buttons={[
                    {
                        id: 0,
                        label: '확인',
                        onPress: onUpdateValue,
                    },
                    {
                        id: 1,
                        label: '취소',
                        onPress: onClose,
                    },
                ]}
                onClose={onClose}>
                <KeyboardAvoidingView
                    style={styles.contents}
                    behavior='padding'>
                    {/* Header */}
                    <View style={styles.header}>
                        <Text style={styles.headerText}>
                            {data?.name}({data?.employeeType})님의
                        </Text>
                        <Text style={styles.headerText}>
                            <Text style={styles.headerPointText}>
                                {dayjs(data.startTime).format('MM월 DD일')}
                            </Text>
                            을 수정하시겠습니까?
                        </Text>
                    </View>

                    {/* Form */}
                    <View style={styles.form}>
                        {/* 출근 시간 */}
                        <View style={styles.inputBox}>
                            <View style={styles.label}>
                                <Text style={styles.labelText}>출근 시간</Text>
                            </View>
                            <Pressable
                                style={styles.input}
                                onPress={() => {
                                    setStartTime(new Date(startTime));
                                    setSelectedTime('start');
                                }}>
                                <Text style={styles.timeText}>
                                    {dayjs(startTime).format('HH:mm')}
                                </Text>

                                <Image source={TimeIcon} />
                            </Pressable>
                        </View>

                        {/* 퇴근 시간 */}
                        <View style={styles.inputBox}>
                            <View style={styles.label}>
                                <Text style={styles.labelText}>퇴근 시간</Text>
                            </View>
                            <Pressable
                                style={styles.input}
                                onPress={() => {
                                    setEndTime(new Date(endTime));
                                    setSelectedTime('end');
                                }}>
                                <Text style={styles.timeText}>
                                    {dayjs(endTime).format('HH:mm')}
                                </Text>

                                <Image source={TimeIcon} />
                            </Pressable>
                        </View>

                        {/* New Value */}
                        <View style={styles.inputBox}>
                            <View style={styles.label}>
                                <Text style={styles.labelText}>변경 금액</Text>
                            </View>
                            <TextInput
                                style={styles.input}
                                value={newSum}
                                onChangeText={handleNumericInputChange}
                                placeholder='변경할 금액을 입력해주세요.'
                                keyboardType={numberKeyboardType}
                            />
                        </View>
                    </View>
                </KeyboardAvoidingView>
            </ModalContainer>

            {/* Date Picker */}
            {!!selectedTime && (
                <DatePicker
                    targetDate={selectedTime === 'start' ? startTime : endTime}
                    setTargetDate={
                        selectedTime === 'start' ? setStartTime : setEndTime
                    }
                    onClose={onCloseDatePicker}
                    mode='time'
                />
            )}
        </>
    );
}

export default PayrollModal;
