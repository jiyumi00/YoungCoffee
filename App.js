import React, { Component } from "react";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer} from '@react-navigation/native';
import RootNavigation from './src/navigation/RootNavigation';

export default class App extends Component{
    render(){
        return (
            <SafeAreaProvider>
                <NavigationContainer >
                
                   <RootNavigation/>
                </NavigationContainer>
            </SafeAreaProvider>
        );
    }
   
}


