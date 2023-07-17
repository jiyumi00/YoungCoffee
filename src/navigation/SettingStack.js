import React, { Component } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Screens
import SettingHome from '../components/setting/SettingHome';
import EmployeeManager from '../components/setting/EmployeeManager';

const Stack = createNativeStackNavigator();

export default class SettingStack extends Component {
    render() {
        return (
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen 
                    name='SettingHome' 
                    component={SettingHome} />
                    
                <Stack.Screen
                    name='EmployeeManager'
                    component={EmployeeManager}
                    options={{ animation: 'none' }}
                />
            </Stack.Navigator>
        )
    }
}