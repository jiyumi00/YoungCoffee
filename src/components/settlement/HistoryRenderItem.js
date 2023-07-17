import React, { Component } from 'react';
import { StyleSheet, View, Pressable } from 'react-native';

// constants
import { THEME } from '../../constants/theme';

// Components
import Image from '../common/Image';
import Text from '../common/Text';

// Images
const SettingIcon = require('../../assets/images/setting_icon/setting_icon.png');

// Styles
const styles = StyleSheet.create({
    history: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 25,
        paddingVertical: 8,
    },
    historyTitle: {
        flex: 1,
    },
    historyTitleText: {
        fontSize: 14,
        fontWeight: '400',
        color: THEME.COLOR.GRAY_COLOR,
    },
    historyAmount: {},
    historyAmountText: {
        fontSize: 16,
        fontWeight: '500',
        color: THEME.COLOR.BLACK_COLOR,
    },
    historySetting: {
        width: 26,
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
});

export default class HistoryRenderItem extends Component {
    constructor(props) {
        super(props);
        console.log('시간별 일한량 보여주기',this.props);
    }

    render() {
        return (
            <View style={styles.history}>
                <View style={styles.historyTitle}>
                    <Text style={styles.historyTitleText}>{this.props.title}</Text>
                </View>

                <View style={styles.historyAmount}>
                    <Text style={styles.historyAmountText}>{this.props.amount}</Text>
                </View>

                {this.props.possible ? (
                    <Pressable style={styles.historySetting} onPress={this.props.onPress}>
                        <Image source={SettingIcon} />
                    </Pressable>
                ) : (
                    <View style={styles.historySetting} />
                )}
            </View>
        );
    }
}

// function HistoryRenderItem({ title, possible, amount, onPress }) {
//     return (
//         <View style={styles.history}>
//             <View style={styles.historyTitle}>
//                 <Text style={styles.historyTitleText}>{title}</Text>
//             </View>

//             <View style={styles.historyAmount}>
//                 <Text style={styles.historyAmountText}>{amount}</Text>
//             </View>

//             {possible ? (
//                 <Pressable style={styles.historySetting} onPress={onPress}>
//                     <Image source={SettingIcon} />
//                 </Pressable>
//             ) : (
//                 <View style={styles.historySetting} />
//             )}
//         </View>
//     );
// }
// export default HistoryRenderItem;