import React from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';

// Constants
import {SHADOW, THEME} from '../../constants/theme';

// Components
import Image from './Image';
import Text from './Text';
import {SafeAreaView} from 'react-native-safe-area-context';

// Images
const AddButtonIcon = require('../../assets/images/bottom_tabs/add/add.png');
const HomeIcon = require('../../assets/images/bottom_tabs/home/home.png');
const HomeActiveIcon = require('../../assets/images/bottom_tabs/home/home_active.png');
const SettlementIcon = require('../../assets/images/bottom_tabs/settlement/settlement.png');
const SettlementActiveIcon = require('../../assets/images/bottom_tabs/settlement/settlement_active.png');
const SettingIcon = require('../../assets/images/bottom_tabs/setting/setting.png');
const SettingActiveIcon = require('../../assets/images/bottom_tabs/setting/setting_active.png');

// Tabs
const TABS = {
  Home: {
    label: '홈',
    icon: HomeIcon,
    activeIcon: HomeActiveIcon,
  },
  SettlementHome: {
    label: '정산관리',
    icon: SettlementIcon,
    activeIcon: SettlementActiveIcon,
  },
  Setting: {
    label: '전체관리',
    icon: SettingIcon,
    activeIcon: SettingActiveIcon,
  },
};

// Styles
const styles = StyleSheet.create({
  tabs: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: THEME.COLOR.WHITE_COLOR,
    paddingVertical: 7,
    ...SHADOW,
  },
  tabButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabButtonIcon: {
    width: 26,
    height: 26,
  },
  addButtonIcon: {
    width: 42,
    height: 42,
  },
  buttonText: {
    marginTop: 0,
    fontSize: 12,
    lineHeight: 13,
    fontWeight: '400',
    color: THEME.COLOR.SILVER,
  },
});

/**
 * @title Main Bottom Tabs UI
 * @returns
 */
function BottomTabBar({state, descriptors, navigation}) {
  const onPressQuickAdd = () => {
    navigation.navigate('QuickAddWorkingTime');
  };

  return (
    <SafeAreaView
      edges={{bottom: 'maximum'}}
      mode="padding"
      style={styles.tabs}>
      {state.routes.map((route, index) => {
        const {key, name} = route;
        const {options} = descriptors[key];
        const {label, icon, activeIcon} = TABS[name];
        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate({name, merge: true});
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: key,
          });
        };

        return (
          <TouchableOpacity
            key={key}
            accessibilityRole="button"
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            activeOpacity={0.8}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.tabButton}>
            <Image
              source={isFocused ? activeIcon : icon}
              style={styles.tabButtonIcon}
            />
            <Text
              style={[
                styles.buttonText,
                {
                  color: isFocused ? THEME.COLOR.SUB_COLOR : THEME.COLOR.SILVER,
                },
              ]}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}

      <TouchableOpacity
        style={styles.tabButton}
        activeOpacity={0.8}
        onPress={onPressQuickAdd}>
        <Image
          source={AddButtonIcon}
          style={styles.addButtonIcon}
          resizeMode="center"
        />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

export default BottomTabBar;
