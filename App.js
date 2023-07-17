import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import RootNavigation from './src/navigation/RootNavigation';

function App() {
    return (
        <SafeAreaProvider>
            <NavigationContainer>
                <RootNavigation />
            </NavigationContainer>
        </SafeAreaProvider>
    );
}

export default App;
