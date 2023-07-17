import React, { Component } from 'react';
import { StyleSheet, View, Pressable, FlatList } from 'react-native';

// Components
import Insets from '../../components/common/Insets';
import Image from '../../components/common/Image';
import Text from '../../components/common/Text';
import SettlementHeader from '../../components/settlement/SettlementHeader';
import SettlementRenderItem from '../../components/settlement/SettlementRenderItem';

// Constants
import { THEME } from '../../constants/theme';

// utils
import { TEST_SETTLEMENT_LIST } from '../../data/testData';

// Images
const CalendarIcon = require('../../assets/images/calendar/calendar.png');

// Styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: THEME.COLOR.WHITE_COLOR,
    },
    selectedDate: {
        paddingHorizontal: 30,
    },
    selectedDateButton: {
        borderColor: THEME.COLOR.LIGHT_GRAY,
        borderWidth: 1,
        paddingVertical: 12,
        paddingHorizontal: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    selectedDateText: {
        fontSize: 16,
        fontWeight: '400',
        color: THEME.COLOR.BLACK_COLOR,
    },
    list: {
        paddingVertical: 20,
    },

    listSeparator: {
        height: 18,
    },
});


export default class SettlementScreen extends Component {
    constructor(props) {
        super(props);
    }
    onPressGoToDetails = (item) =>
        this.props.navigation.navigate('SettlementDetails', { state: item });
        
    render() {
        return (
            <View style={styles.container}>
                <Insets>
                    {/* Header - 이번 달 마감 날짜 표시 */}
                    <SettlementHeader />

                    {/* List 확인에 필요한 Date */}
                    <View style={styles.selectedDate}>
                        <Pressable style={styles.selectedDateButton}>
                            <Text style={styles.selectedDateText}>2023. 02 - 2023. 05</Text>
                            <Image source={CalendarIcon} />
                        </Pressable>
                    </View>

                    {/* Date List */}
                    <FlatList
                        style={styles.list}
                        data={TEST_SETTLEMENT_LIST}
                        keyExtractor={(_item, index) => index.toString()}
                        ItemSeparatorComponent={() => <View style={styles.listSeparator} />}
                        renderItem={({ item }) => (
                                <SettlementRenderItem
                                    item={item}
                                    onPress={() => this.onPressGoToDetails(item)}/>
                                )}
                    />
                </Insets>
            </View>
        );
    }
}
// function SettlementScreen({ navigation }) {
//     const onPressGoToDetails = item =>
//         navigation.navigate('SettlementDetails', {
//             state: item,
//         });

//     return (
//         <View style={styles.container}>
//             <Insets>
//                 {/* Header - 이번 달 마감 날짜 표시 */}
//                 <SettlementHeader />

//                 {/* List 확인에 필요한 Date */}
//                 <View style={styles.selectedDate}>
//                     <Pressable style={styles.selectedDateButton}>
//                         <Text style={styles.selectedDateText}>
//                             2023. 02 - 2023. 05
//                         </Text>
//                         <Image source={CalendarIcon} />
//                     </Pressable>
//                 </View>

//                 {/* Date List */}
//                 <FlatList
//                     style={styles.list}
//                     data={TEST_SETTLEMENT_LIST}
//                     keyExtractor={(_item, index) => index.toString()}
//                     ItemSeparatorComponent={()=><View style={styles.listSeparator} />}
//                     renderItem={({ item }) => {
//                         return (
//                             <SettlementRenderItem
//                                 item={item}
//                                 onPress={() => onPressGoToDetails(item)}
//                             />
//                         );
//                     }}
//                 />
//             </Insets>
//         </View>
//     );
// }

// export default SettlementScreen;
