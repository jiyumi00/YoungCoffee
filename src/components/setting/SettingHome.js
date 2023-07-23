import React, { useCallback, Component } from 'react';
import { FlatList, StyleSheet, TouchableOpacity, View,BackHandler } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Constants
import { THEME } from '../../constants/theme';

// Components
import Insets from '../../components/common/Insets';
import Image from '../../components/common/Image';
import Text from '../../components/common/Text';

// Images
const LinkIcon = require('../../assets/images/link_icon/link_icon.png');
const LogoutIcon = require('../../assets/images/logout/logout.png');

/**
 * @title 관리 바로가기 목록
 * @returns
 */

export const SETTINGS = [
    {
        name: '직원 관리',
        //link: 'EmployeeList',
        link:'EmployeeManager'
    },
    {
        name: '내 정보 관리',
        link: 'EditProfile',
    },
    {
        name: '알림 관리',
        link: 'NotificationManager',
    },
];

//탭 메뉴의 관리를 선택했을 경우 홈화면
export default class SettingHome extends Component {

    constructor(props) {
        super(props);
    }

    logout=()=> {
        console.log('logout clicked...');
        AsyncStorage.clear();
     
       this.props.navigation.navigate('SignIn')
    
        //this.props.navigation.popToTop();
    }

    render() {
        return (
            <View style={styles.container}>
                <Insets>
                    <FlatList
                        contentContainerStyle={{ flexGrow: 1 }}
                        data={SETTINGS}
                        renderItem={({item, index}) => <RenderItem item={item} index={index} navigation={this.props.navigation}/> }
                        ItemSeparatorComponent={()=><View style={styles.separator} />}
                        ListHeaderComponent={()=><View style={styles.separator} />}
                        ListFooterComponent={()=><View style={styles.separator} />}
                    />
                    <View style={styles.logoutButtonView}>
                        <TouchableOpacity
                            onPress={this.logout}
                            style={styles.logoutButton}
                            activeOpacity={0.8}>
                            <Text style={styles.logoutButtonText}>로그아웃</Text>
                            <Image source={LogoutIcon} />
                        </TouchableOpacity>
                    </View>
                </Insets>
            </View>
        )
    }

}

//전체관리의 메뉴항목
class RenderItem extends Component {
    constructor(props) {
        super(props);
        this.navigation=this.props.navigation;
        this.item=this.props.item;
    }
    onPress=()=>{
        this.navigation.navigate(this.item.link);
    }
    render() {
        console.log('item',this.item)
        return (
            <TouchableOpacity
                style={styles.settingItem}
                activeOpacity={0.8}
                onPress={this.onPress}>
                <Text style={styles.settingItemText}>{this.item.name}</Text>
                <Image source={LinkIcon} />
            </TouchableOpacity>
        )
    }
}



// styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: THEME.COLOR.WHITE_COLOR,
    },
    settingItem: {
        paddingHorizontal: 25,
        paddingVertical: 18,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    settingItemText: {
        fontSize: 16,
        fontWeight: '500',
        color: THEME.COLOR.MAIN_COLOR,
    },
    separator: {
        width: '100%',
        height: 1,
        backgroundColor: THEME.COLOR.LIGHT_GRAY,
    },
    logoutButtonView: {
        paddingHorizontal: 25,
        paddingVertical: 20,
    },
    logoutButton: {
        backgroundColor: THEME.COLOR.GHOST_WHITE,
        height: 54,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    logoutButtonText: {
        fontSize: 16,
        fontWeight: '500',
        color: THEME.COLOR.MAIN_COLOR,
        marginRight: 10,
    },
});

