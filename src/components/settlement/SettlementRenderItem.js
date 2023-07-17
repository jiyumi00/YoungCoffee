import { StyleSheet, View, Pressable } from 'react-native';
import React, { Component } from 'react';

// Constants
import { settlementState } from '../../constants/settlement';
import { THEME } from '../../constants/theme';

// Components
import Image from '../common/Image';

// Utils
import { monthFormat } from '../../utils/DateFormat';
import Text from '../common/Text';

// Images
const LinkIcon = require('../../assets/images/link_icon/link_icon.png');

// Styles
const styles = StyleSheet.create({
    listItem: {
        paddingHorizontal: 35,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    itemDate: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    itemDateText: {
        fontSize: 18,
        fontWeight: '400',
        color: THEME.COLOR.MAIN_COLOR,
    },
    linkIcon: {
        width: 12,
        marginLeft: 10,
    },
    itemState: {},
    itemStateText: {
        fontSize: 15,
        fontWeight: '400',
        color: THEME.COLOR.VIOLET_COLOR,
    },
});

export default class SettlementRenderItem extends Component {
    constructor(props) {
        super(props);

    }
    render() {
        const { year, month, state } = this.props.item;
        const { label, color } = settlementState[state];

        return (
            <Pressable style={styles.listItem} onPress={this.props.onPress}>
                <View style={styles.itemDate}>
                    <Text style={styles.itemDateText}>{`${year}. ${monthFormat(month,)}`}</Text>
                    <Image style={styles.linkIcon} source={LinkIcon} />
                </View>
                <View style={styles.itemState}>
                    <Text style={[styles.itemStateText, { color }]}>{label}</Text>
                </View>
            </Pressable>
        );
    }
}

// function SettlementRenderItem({ item, onPress }) {
//     const { year, month, state } = item;
//     const { label, color } = settlementState[state];

//     return (
//         <Pressable style={styles.listItem} onPress={onPress}>
//             <View style={styles.itemDate}>
//                 <Text style={styles.itemDateText}>{`${year}. ${monthFormat(
//                     month,
//                 )}`}</Text>
//                 <Image style={styles.linkIcon} source={LinkIcon} />
//             </View>
//             <View style={styles.itemState}>
//                 <Text
//                     style={[
//                         styles.itemStateText,
//                         {
//                             color,
//                         },
//                     ]}>
//                     {label}
//                 </Text>
//             </View>
//         </Pressable>
//     );
// }

// export default SettlementRenderItem;
