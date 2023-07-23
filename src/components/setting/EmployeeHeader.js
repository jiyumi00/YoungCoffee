import React, { Component } from 'react';
import {
    Pressable,
    StatusBar,
    StyleSheet,
    TouchableOpacity,
    View,
    Alert
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

// Constants
import { THEME } from '../../constants/theme';
import Image from '../common/Image';
import Text from '../common/Text';

// Images
const BackIcon = require('../../assets/images/back_icon/back_icon.png');
const PlusIcon = require('../../assets/images/plus_icon/plus_icon.png');


export default class EmployeeHeader extends Component {
    constructor(props){
        super(props);
        this.navigation=this.props.navigation; 
        this.state={
            isFullTime:false
        }
    }

    employeeKindClicked=(kind)=> {
        if(kind=="fullTime")
            Alert.alert("직원관리","현재 정직원 관리는 사용할 수 없습니다");
        else {
            this.setState({isFullTime:!this.state.isFullTime});
            this.props.changeEmployeeKindListener(kind);
        }
    }

    addEmployee=()=> {
        this.props.addEmployeeListener();
    }

    render() {
        return (
            <View
                style={[
                    styles.header,
                    {/*{paddingTop: insets.top}*/}
                ]}>
                <StatusBar barStyle='light-content' />
    
                {/* Screen Title */}
                <View style={styles.screenTitle}>
                    <Pressable
                        style={styles.backButton}
                        onPress={this.navigation.goBack}>
                        <Image source={BackIcon} style={styles.backIcon} />
                    </Pressable>
    
                    <Text style={styles.screenTitleText}>직원관리</Text>
    
                    <Pressable style={styles.addButton} onPress={this.addEmployee}>
                        <Image source={PlusIcon} style={styles.plusIcon} />
                        <Text style={styles.addButtonText}>직원등록</Text>
                    </Pressable>
                </View>
    
                {/* Line */}
                <View style={styles.line} />
    
                {/* Tabs */}
                <View style={styles.tabs}>
                <TouchableOpacity
                        style={[
                            styles.tab,
                            !this.state.isFullTime ? styles.activeTab : null,
                        ]}
                        activeOpacity={0.8}
                        onPress={() => this.employeeKindClicked('partTime')}>
                        <Text style={styles.tabText}>아르바이트 관리</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[
                            styles.tab,
                            this.state.isFullTime ? styles.activeTab : null,
                        ]}
                        activeOpacity={0.8}
                        onPress={() => this.employeeKindClicked('fullTime')}>
                        <Text style={styles.tabText}>정직원 관리</Text>
                    </TouchableOpacity>  
                </View>
            </View>
        );
    }
}



// Styles
const styles = StyleSheet.create({
    header: {
        backgroundColor: THEME.COLOR.MAIN_COLOR,
    },
    screenTitle: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15,
        paddingHorizontal: 25,
    },
    screenTitleText: {
        flex: 1,
        fontSize: 18,
        fontWeight: '600',
        color: THEME.COLOR.WHITE_COLOR,
    },
    backButton: {
        marginRight: 10,
    },
    backIcon: {
        width: 20,
        height: 20,
    },
    addButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: THEME.COLOR.SUB_COLOR,
        paddingVertical: 5,
        paddingHorizontal: 12,
        borderRadius: 24,
    },
    plusIcon: {
        marginRight: 6,
    },
    addButtonText: {
        fontSize: 14,
        fontWeight: '500',
        color: THEME.COLOR.WHITE_COLOR,
    },
    line: {
        width: '100%',
        height: 1,
        backgroundColor: THEME.COLOR.SUB_COLOR,
    },
    tabs: {
        paddingHorizontal: 25,
        paddingVertical: 15,
        flexDirection: 'row',
        alignItems: 'center',
    },
    tab: {
        marginRight: 25,
        opacity: 0.5,
    },
    activeTab: {
        opacity: 1,
    },
    tabText: {
        fontSize: 16,
        fontWeight: '500',
        color: THEME.COLOR.WHITE_COLOR,
    },
});
