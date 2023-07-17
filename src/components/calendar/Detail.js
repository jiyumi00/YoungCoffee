import React, { Component } from 'react';
import { FlatList, Pressable, StyleSheet, View } from 'react-native';

// Components
import WebServiceManager from '../../utils/webservice_manager';
import Insets from '../../components/common/Insets';
import DetailRenderItem from '../../components/calendar/DetailRenderItem';
import Image from '../../components/common/Image';
import Text from '../../components/common/Text';
import SettingHeader from '../../components/setting/SettingHeader';
import Line from '../../components/common/Line';

import SelectViewTypeModal from './SelectViewTypeModal';

// Constants
import { THEME } from '../../constants/theme';
import Constant from '../../utils/constants';

// Data
import { TEST_SETTLEMENT_LIST } from '../../data/testData';

// Images
const SelectIcon = require('../../assets/images/select_icon/select_icon.png');


export default class Detail extends Component {
    constructor(props) {
        super(props);
        this.date = this.props.route.params.date;
        this.userID='';

        this.state={
            viewType:'일',
            modalVisible:false,
            contents:[]
        }

        console.log('state date=',this.props.route.params.date);
    }

    componentDidMount() {
        Constant.getUserInfo().then((response)=> {
            this.userID=response.userID;
            this.callGetReportAPI().then((response)=> {
                console.log('response=',response);
                this.setState({contents:response});
            });
        })
       
    }

    changeViewType=()=> {
        this.setState({modalVisible:true});
    }

    cancelButtonClicked=()=> {
        this.setState({modalVisible:false});
    }

    okButtonClicked=(item)=> {
        this.setState({viewType:item,modalVisible:false,contents:[]},()=> {
            this.callGetReportAPI().then((response)=> {
                console.log('response=',response);
                this.setState({contents:response});
            });
        });
    }

    async callGetReportAPI() {
        let manager;
        
        if(this.state.viewType=='일')
            manager = new WebServiceManager(Constant.serviceURL+"/GetDailyReport?user_id="+this.userID+"&day="+this.date);
        else if(this.state.viewType=='주')
            manager = new WebServiceManager(Constant.serviceURL+"/GetWeeklyReport?user_id="+this.userID+"&day="+this.date);
        else 
        manager = new WebServiceManager(Constant.serviceURL+"/GetMonthlyReport?user_id="+this.userID+"&day="+this.date);

        let response = await manager.start();
        if (response.ok)
            return response.json();
        else
            Promise.reject(response);
    }

    render() {
        return (
            <View style={styles.container}>
                <Insets>
                    <SettingHeader title='업무 캘린더' />
                    <FlatList
                        ListHeaderComponent={
                            <>
                                <View style={styles.contentsHeader}>
                                    {/* TIP */}
                                    <View style={styles.tip}>
                                        <View style={styles.tipIcon}>
                                            <Text style={styles.tipIconText}>
                                                !
                                            </Text>
                                        </View>
                                        <Text style={styles.tipText}>
                                            총 금액은 주휴수당을 합한 금액입니다.
                                        </Text>
                                    </View>
    
                                    {/* Select Date */}
                                    <View style={styles.selectDateView}>
                                        {/* Selected Date */}
                                        <View style={styles.selectedDate}>
                                            <Text style={styles.selectedDateText}>
                                                {this.date}
                                            </Text>
                                        </View>
    
                                        {/* Select Date Type */}
                                        <Pressable
                                            style={styles.selectType}
                                            onPress={this.changeViewType}>
                                            <Text style={styles.typeItemText}>
                                                {this.state.viewType}
                                            </Text>
                                            <Image source={SelectIcon} />
                                        </Pressable>
                                    </View>
                                </View>
                                <Line />
                            </>
                        }
                        data={this.state.contents}
                        renderItem={({item,index})=> <DetailRenderItem item={item} index={index} viewType={this.state.viewType}/>}
                        style={{ flex: 1 }}
                        contentContainerStyle={{ flexGrow: 1 }}
                    />
                </Insets>
                {this.state.modalVisible && (
                    <SelectViewTypeModal navigation={this.props.naviagtion} okButtonClicked={(item)=>this.okButtonClicked(item)} cancelButtonClicked={this.cancelButtonClicked}/>
                )}               
            </View>
        );
    }
}



// Styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: THEME.COLOR.WHITE_COLOR,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 15,
        paddingHorizontal: 25,
    },
    screenTitle: {
        fontSize: 18,
        fontWeight: '800',
        color: THEME.COLOR.MAIN_COLOR,
    },
    line: {
        width: '100%',
        height: 1,
        backgroundColor: THEME.COLOR.LIGHT_GRAY,
    },
    contentsHeader: {
        paddingVertical: 20,
        paddingHorizontal: 25,
    },
    tip: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    tipIcon: {
        width: 15,
        height: 15,
        borderRadius: 9,
        backgroundColor: THEME.COLOR.VIOLET_COLOR,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 6,
    },
    tipIconText: {
        fontSize: 14,
        lineHeight: 16,
        fontWeight: '500',
        color: THEME.COLOR.WHITE_COLOR,
    },
    tipText: {
        fontSize: 13,
        fontWeight: '400',
        color: THEME.COLOR.GRAY_COLOR,
    },
    selectDateView: {
        marginTop: 10,
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
    },
    selectedDate: {},
    selectedDateText: {
        fontSize: 21,
        fontWeight: '600',
        color: THEME.COLOR.MAIN_COLOR,
    },
    selectType: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderColor: THEME.COLOR.DISABLED_COLOR,
        borderWidth: 1,
        width: 60,
        paddingHorizontal: 8,
        paddingVertical: 3,
    },
    typeItem: {},
    typeItemText: {
        fontSize: 14,
        fontWeight: '500',
        color: THEME.COLOR.BLACK_COLOR,
    },
});
