import React, {Component} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

//components
import Constant from '../utils/constants';

// Screens
import MainBottomTabs from './MainBottomTabs';
import Login from '../components/auth/Login';
import FirstLogin from '../components/auth/FirstLogin';

import SettlementDetail from '../components/settlement/SettlementDetail';

import ReportDetail from '../components/calendar/ReportDetail';
import FullTimeDetail from '../components/setting/FullTimeDetail';
import PartTimeDetail from '../components/setting/PartTimeDetail';

import ModifyPhoneModal from '../components/setting/ModifyPhoneModal';
import ModifySalaryModal from '../components/setting/ModifySalaryModal';
import ModifyActivationModal from '../components/setting/ModifyActivationModal';

import SelectViewTypeModal from '../components/calendar/SelectViewTypeModal';
import AddEmployee from '../components/setting/AddEmployee';
import QuickAddWorkingTime from '../components/auth/QuickAddWorkingTime';
import AddWorkingTimeModal from '../components/auth/AddWorkingTimeModal';

import BonusModifierModalScreen from '../screens/modal/BonusModifierModalScreen';
import ModifyWorkTimeModal from '../components/settlement/ModifyWorkTimeModal';
import {SafeAreaInsetsContext} from 'react-native-safe-area-context';

const Stack = createNativeStackNavigator();

export default class RootNavigation extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Stack.Navigator initialRouteName="SignIn">
        <Stack.Group screenOptions={{headerShown: false}}>
          <Stack.Screen name="MainTab" component={MainBottomTabs} />
          <Stack.Screen name="SignIn" component={Login} />
          <Stack.Screen name="FirstLogin" component={FirstLogin} />

          <Stack.Screen name="ReportDetail" component={ReportDetail} />
          <Stack.Screen name="SettlementDetails" component={SettlementDetail} />

          <Stack.Screen name="AddEmployee" component={AddEmployee} />

          <Stack.Screen name="FullTimeDetail" component={FullTimeDetail} />
          <Stack.Screen name="PartTimeDetail" component={PartTimeDetail} />

          {/* 모달 */}
          <Stack.Group
            screenOptions={{
              presentation: 'transparentModal',
              animation: 'fade',
            }}>
            <Stack.Screen
              name="QuickAddWorkingTime"
              component={QuickAddWorkingTime}
            />
            <Stack.Screen
              name="AddWorkingTimeModal"
              component={AddWorkingTimeModal}
            />

            <Stack.Screen
              name="ModifyPhoneModal"
              component={ModifyPhoneModal}
            />
            <Stack.Screen
              name="ModifySalaryModal"
              component={ModifySalaryModal}
            />
            <Stack.Screen
              name="ModifyActivationModal"
              component={ModifyActivationModal}
            />
            {/*<Stack.Screen name='BonusModify' component={BonusModifierModalScreen}/>*/}
            <Stack.Screen
              name="ModifyWorkTimeModal"
              component={ModifyWorkTimeModal}
            />
            <Stack.Screen
              name="SelectViewTypeModal"
              component={SelectViewTypeModal}
            />
          </Stack.Group>
        </Stack.Group>
      </Stack.Navigator>
    );
  }

  // render() {
  //     return (
  //         <Stack.Navigator initialRouteName='SignIn'>
  //             {this.state.isLoggedIn ? (
  //                 <Stack.Group screenOptions={{ headerShown: false }}>

  //                     <Stack.Screen name='MainTab' component={MainBottomTabs} />

  //                     <Stack.Screen name='ReportDetail' component={ReportDetail} />
  //                     <Stack.Screen name='SettlementDetails' component={SettlementDetail}/>

  //                     <Stack.Screen name='AddEmployee' component={AddEmployee}/>

  //                     <Stack.Screen name='FullTimeDetail' component={FullTimeDetail}/>
  //                     <Stack.Screen name='PartTimeDetail' component={PartTimeDetail}/>
  //                     <Stack.Screen name='EditProfile' component={EditProfileScreen}/>

  //                     {/* 모달 */}
  //                     <Stack.Group screenOptions={{ presentation: 'transparentModal', animation: 'fade',}}>
  //                         <Stack.Screen name='QuickAddPartTime' component={QuickAddPartTime}/>
  //                         <Stack.Screen name='AddPartTimeModal' component={AddPartTimeModal}/>

  //                         <Stack.Screen name='ModifyPhoneModal' component={ModifyPhoneModal}/>
  //                         <Stack.Screen name='ModifySalaryModal' component={ModifySalaryModal}/>
  //                         <Stack.Screen name='ModifyActivationModal' component={ModifyActivationModal}/>
  //                         <Stack.Screen name='BonusModify' component={BonusModifierModalScreen}/>
  //                         <Stack.Screen name='ModifyWorkTimeModal' component={ModifyWorkTimeModal}/>
  //                         <Stack.Screen name='SelectViewTypeModal' component={SelectViewTypeModal}/>
  //                     </Stack.Group>
  //                 </Stack.Group>
  //             ) : (
  //                 <Stack.Group screenOptions={{ headerShown: false }}>
  //                     <Stack.Screen name='SignIn' component={Login} />
  //                     <Stack.Screen name='FirstLogin' component={FirstLogin}/>
  //                 </Stack.Group>
  //             )}
  //         </Stack.Navigator>
  //     );
  // }
}
