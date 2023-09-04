import React, {Component} from 'react';
import {
  FlatList,
  StyleSheet,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native';

// Constants
import {THEME} from '../../constants/theme';

// Components
import Insets from '../../components/common/Insets';
import Image from '../../components/common/Image';
import Text from '../../components/common/Text';
import {SafeAreaView} from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
    link: 'EmployeeManager',
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

  goLogoutAlert = () => {
    Alert.alert(
      '주의',
      '로그아웃하고 앱을 종료합니다.',
      [
        {text: '취소', onPress: () => {}},
        {
          text: '확인',
          onPress: () => {
            this.logout();
          },
        },
      ],
      {cancelable: false},
    );
    return true;
  };

  logout = () => {
    AsyncStorage.clear();
    this.props.navigation.navigate('SignIn');
  };

  render() {
    return (
      <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
        <FlatList
          contentContainerStyle={{flexGrow: 1}}
          data={SETTINGS}
          renderItem={({item, index}) => (
            <RenderItem
              item={item}
              index={index}
              navigation={this.props.navigation}
            />
          )}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          ListHeaderComponent={() => <View style={styles.separator} />}
          ListFooterComponent={() => <View style={styles.separator} />}
        />
        <View style={styles.settingItem}>
          <Text style={styles.tipText}>
            로그아웃하면 다음 로그인 시 {`\n`}아이디와 비밀번호를 다시
            입력해야 합니다.
          </Text>
        </View>
        <View style={styles.logoutButtonView}>
          <TouchableOpacity
            onPress={this.goLogoutAlert}
            style={styles.logoutButton}
            activeOpacity={0.8}>
            <Text style={styles.logoutButtonText} fontWeight={600}>
              로그아웃
            </Text>
            <Image source={LogoutIcon} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}

//전체관리의 메뉴항목
class RenderItem extends Component {
  constructor(props) {
    super(props);
    this.navigation = this.props.navigation;
    this.item = this.props.item;
  }

  onPress = () => {
    if (this.item.link == 'NotificationManager')
      Alert.alert('알림관리', '이 기능은 추후 제공될 예정입니다');
    else this.navigation.navigate(this.item.link);
  };

  render() {
    return (
      <TouchableOpacity
        style={styles.settingItem}
        activeOpacity={0.8}
        onPress={this.onPress}>
        <Text style={styles.settingItemText} fontWeight={600}>
          {this.item.name}
        </Text>
        <Image source={LinkIcon} />
      </TouchableOpacity>
    );
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
  tipText: {
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 24,
    color: THEME.COLOR.GRAY_COLOR,
  },
  settingItemText: {
    fontSize: 17,
    fontWeight: '600',
    color: THEME.COLOR.MAIN_COLOR,
  },
  separator: {
    width: '100%',
    height: 1,
    backgroundColor: THEME.COLOR.LIGHT_GRAY,
  },
  logoutButtonView: {
    paddingHorizontal: 25,
    paddingVertical: 10,
  },
  logoutButton: {
    backgroundColor: THEME.COLOR.GHOST_WHITE,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  logoutButtonText: {
    fontSize: 17,
    fontWeight: '600',
    color: THEME.COLOR.MAIN_COLOR,
    marginRight: 10,
  },
});
