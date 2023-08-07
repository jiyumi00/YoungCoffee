import React from 'react';
import {StyleSheet, View} from 'react-native';

// Constants
import {THEME} from '../../constants/theme';

// Components
import Text from './Text';

// Styles
const styles = StyleSheet.create({
  inputBox: {
    marginBottom: 30,
  },
  label: {
    fontSize: 15,
    fontWeight: '600',
    color: THEME.COLOR.SUB_COLOR,
    marginBottom: 3,
  },
});

function InputBox({label, input, viewStyle = {}, textStyle = {}, last}) {
  return (
    <View
      style={[styles.inputBox, viewStyle, last ? {marginBottom: 10} : null]}>
      <Text style={{...styles.label, ...textStyle}} fontWeight={600}>
        {label}
      </Text>
      {input}
    </View>
  );
}

export default InputBox;
