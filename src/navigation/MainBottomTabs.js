import React, { Component } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Components
import BottomTabBar from '../components/common/BottomTabBar';
import CalendarHome from '../components/calendar/CalendarHome';
import SettlementHome from '../components/settlement/SettlementHome';
import SettingStack from './SettingStack';

const Tab = createBottomTabNavigator();

 export default class MainBottomTabs extends Component {
    render(){
        return (
            <Tab.Navigator
                tabBar={BottomTabBar}
                screenOptions={{ headerShown: false }}>
                <Tab.Screen name='Home' component={CalendarHome} />
                <Tab.Screen name='SettlementHome' component={SettlementHome} />
                <Tab.Screen name='Setting' component={SettingStack} />
            </Tab.Navigator>
        );
    }
   
}
