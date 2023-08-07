import React from 'react';
import {StatusBar, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

function Insets({children}) {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{
        //paddingTop: Platform.OS === 'android' && insets.top + 15,
        // paddingTop: insets.top + 15,
        paddingBottom: insets.bottom,
        paddingLeft: insets.left,
        paddingRight: insets.right,
        flex: 1,
      }}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />
      {children}
    </View>
  );
}

export default Insets;
