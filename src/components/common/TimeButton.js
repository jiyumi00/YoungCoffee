import React, { Component } from 'react';
import { StyleSheet, Text, Pressable } from 'react-native';
import dayjs from 'dayjs';

// Components
import Image from './Image';

// Constants
import { THEME } from '../../constants/theme';

// Utils
import { dateFormat, timeFormat } from '../../utils/DateFormat';

// Images
const TimeIcon = require('../../assets/images/time_icon/time_icon.png');


/**
 * @title Date 설정 버튼
 * @description
 * - 받아온 mode props 값에 따라 표시되는 형식이 달라짐
 * @returns
 */

export default class TimeButton extends Component {
    constructor(props) {
        super(props);
        this.onPress=this.props.onPress;

        this.state={
            defaultTime:null
        }
    }

    componentDidMount() {
        this.setState({defaultTime:dayjs(this.props.defaultTime).format("HH:mm")});
    }

    render() {
        return (
            <Pressable style={styles.input} onPress={this.onPress}>
                <Text style={styles.inputText}>{this.state.defaultTime}</Text>
                <Image source={TimeIcon} style={styles.icon} />
            </Pressable>
        );
    }
}



// Styles
const styles = StyleSheet.create({
    input: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderColor: THEME.COLOR.LIGHT_GRAY,
        borderWidth: 1,
        borderStyle: 'solid',
        paddingHorizontal: 15,
        height: 42,
    },
    inputText: {
        fontSize: 15,
        fontFamily: 'Pretendard-Regular',
        color: THEME.COLOR.MAIN_COLOR,
    },
    icon: {
        width: 15,
        position: 'absolute',
        right: 15,
    },
});
