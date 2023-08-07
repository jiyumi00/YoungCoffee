import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {View, SafeAreaView} from 'react-native';
// Components
import BottomTabBar from '../components/common/BottomTabBar';
import CalendarHome from '../components/calendar/CalendarHome';
import SettlementHome from '../components/settlement/SettlementHome';
import SettingStack from './SettingStack';

const Tab = createBottomTabNavigator();

// const insets = useSafeAreaInsets();
function MainBottomTabs() {
  return (
    <Tab.Navigator tabBar={BottomTabBar} screenOptions={{headerShown: false}}>
      <Tab.Screen name="Home" component={CalendarHome} />
      <Tab.Screen name="SettlementHome" component={SettlementHome} />
      <Tab.Screen name="Setting" component={SettingStack} />
    </Tab.Navigator>
  );
}

export default MainBottomTabs;
