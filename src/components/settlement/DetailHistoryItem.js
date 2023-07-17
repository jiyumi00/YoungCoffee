import { StyleSheet, View, Pressable, FlatList } from 'react-native';
import React, { Component } from 'react';
import dayjs from 'dayjs';

// Styles
import Image from '../common/Image';
import HistoryRenderItem from './HistoryRenderItem';
import Text from '../common/Text';

// Constants
import { THEME } from '../../constants/theme';
import { historyType } from '../../constants/settlement';

// Utils
import { amountFormat } from '../../utils/AmountFormat';

// Images
const SelectIcon = require('../../assets/images/select_icon/select_icon.png');


export default class DetailHistoryItem extends Component {
    constructor(props) {
        super(props);
        this.item = this.props.item;
        this.state = {
            onToggle: false,
            detailState: this.props.detailState,
        }

        console.log('items = ',this.props.item);
    }

    onToggle=()=> {
        this.setState({onToggle:!this.state.onToggle});
        console.log('toggle on and off');
    }

    render() {
        return (
            <Pressable style={styles.employee} onPress={this.onToggle}>
                {/* Line */}
                <View style={styles.line} />

                {/* Employee Settlement Preview */}
                <View style={styles.employeeInfo}>
                    <View style={styles.userName}>
                        <Text style={styles.userNameText}>{this.item.employee.name}</Text>
                    </View>

                    <View style={styles.totalAmount}>
                        <Text style={styles.totalAmountText}>{amountFormat(this.item.pay)}원</Text>
                    </View>

                    <View style={[ styles.toggleIcon, this.state.onToggle && styles.activeToggleIcon]}>
                        <Image source={SelectIcon} />
                    </View>
                </View>

                {/* Employee History List */}
                {this.state.onToggle && (
                    <FlatList
                        data={this.item.times}
                        style={styles.historyList}
                        keyExtractor={(_, index) => index.toString()}
                        renderItem={({item}) => { this.renderItem(item) }}
                    />
                )}

                {/* Line */}
                <View style={styles.line} />
            </Pressable>
        );
    }


    renderItem=(item)=> {
        //const historyTitle = `${dayjs(item.start).format('MM. DD',)} (${item.end}시간)`;   
        //const historyAmount = amountFormat(item.start);
        console.log('times= ',item);
        console.log('times start = ',item.start);

        return (
            <HistoryRenderItem
                title="title"
                key={item}
                //possible={historyPossible}
                amount={1000}
                onPress={() => this.props.onModifySelectedItem(item)} />
        );
    }
}



// Styles
styles = StyleSheet.create({
    employee: {},
    line: {
        height: 1,
        width: '100%',
        backgroundColor: THEME.COLOR.LIGHT_GRAY,
    },
    employeeInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 14,
        paddingHorizontal: 25,
    },
    userName: {
        flex: 1,
    },
    userNameText: {
        fontSize: 17,
        fontWeight: '600',
        color: THEME.COLOR.BLACK_COLOR,
    },
    totalAmount: {},
    totalAmountText: {
        fontSize: 17,
        fontWeight: '600',
        color: THEME.COLOR.SUB_COLOR,
    },
    toggleIcon: {
        marginLeft: 10,
        opacity: 0.4,
    },
    activeToggleIcon: {
        transform: [{ scaleY: -1 }],
    },
    historyList: {
        paddingVertical: 10,
        borderTopColor: THEME.COLOR.LIGHT_GRAY,
        borderTopWidth: 1,
        borderStyle: 'dashed',
    },
});




