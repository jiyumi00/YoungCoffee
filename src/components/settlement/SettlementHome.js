import React, { Component } from 'react';
import { StyleSheet, View, Pressable, FlatList } from 'react-native';

// Components
import Insets from '../common/Insets';
import Image from '../common/Image';
import Text from '../common/Text';
import SettlementHeader from './SettlementHeader';
import Constant from '../../utils/constants';
import WebServiceManager from '../../utils/webservice_manager';

// Constants
import { THEME } from '../../constants/theme';
import { settlementState } from '../../constants/settlement';


// Images
const CalendarIcon = require('../../assets/images/calendar/calendar.png');
const LinkIcon = require('../../assets/images/link_icon/link_icon.png');


export default class SettlementHome extends Component {
    constructor(props) {
        super(props);

        this.state={
            contents:[]
        }
    }

    componentDidMount() {
        Constant.getUserInfo().then((response)=> {
            this.userID=response.userID;
            this.callGetSettlementListAPI().then((response)=> {
                console.log('settlement list = ',response);
                this.setState({contents:response});
            });
        });
    }

    async callGetSettlementListAPI() {
        let manager = new WebServiceManager(Constant.serviceURL+"/GetSettlementList?user_id="+this.userID);
        let response = await manager.start();
        if (response.ok)
            return response.json();
        else
            Promise.reject(response);
    }

    goSettlementDetail = (item) => {
        this.props.navigation.navigate('SettlementDetails', { data: item });
        if(item.complete==0)
            console.log('settlement detail clicked to 미정산');
        else
        console.log('settlement detail clicked to 정산완료');
    }
        
    render() {
        return (
            <View style={homeStyles.container}>
                <Insets>
                    {/* Header - 이번 달 마감 날짜 표시 */}
                    <SettlementHeader />

                    {/* List 확인에 필요한 Date */}
                    <View style={homeStyles.selectedDate}>
                        <Pressable style={homeStyles.selectedDateButton}>
                            <Text style={homeStyles.selectedDateText}>2023-02 ~ 2023-07</Text>
                            <Image source={CalendarIcon} />
                        </Pressable>
                    </View>

                    {/* Date List */}
                    <FlatList
                        style={homeStyles.list}
                        data={this.state.contents}
                        ItemSeparatorComponent={() => <View style={homeStyles.listSeparator} />}
                        renderItem={({ item }) => <ListItem item={item} onPress={() => this.goSettlementDetail(item)}/>}
                    />
                </Insets>
            </View>
        );
    }
}


class ListItem extends Component {
    constructor(props) {
        super(props);

    }
    render() {
        const { date, complete } = this.props.item;
        const { label, color } = settlementState[complete];

        return (
            <Pressable style={renderStyles.listItem} onPress={this.props.onPress}>
                <View style={renderStyles.itemDate}>
                    <Text style={renderStyles.itemDateText}>{date}</Text>
                    <Image style={renderStyles.linkIcon} source={LinkIcon} />
                </View>
                
                <View style={renderStyles.itemState}>
                    <Text style={[renderStyles.itemStateText, { color }]}>{label}</Text>
                </View>
            </Pressable>
        );
    }
}



// renderStyles
const homeStyles = StyleSheet.create({
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


// renderStyles
const renderStyles = StyleSheet.create({
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
// function SettlementScreen({ navigation }) {
//     const onPressGoToDetails = item =>
//         navigation.navigate('SettlementDetails', {
//             state: item,
//         });

//     return (
//         <View style={homeStyles.container}>
//             <Insets>
//                 {/* Header - 이번 달 마감 날짜 표시 */}
//                 <SettlementHeader />

//                 {/* List 확인에 필요한 Date */}
//                 <View style={homeStyles.selectedDate}>
//                     <Pressable style={homeStyles.selectedDateButton}>
//                         <Text style={homeStyles.selectedDateText}>
//                             2023. 02 - 2023. 05
//                         </Text>
//                         <Image source={CalendarIcon} />
//                     </Pressable>
//                 </View>

//                 {/* Date List */}
//                 <FlatList
//                     style={homeStyles.list}
//                     data={TEST_SETTLEMENT_LIST}
//                     keyExtractor={(_item, index) => index.toString()}
//                     ItemSeparatorComponent={()=><View style={homeStyles.listSeparator} />}
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
