import React from 'react';
import {Pressable, StyleSheet, View} from 'react-native';

// Constants
import {THEME} from '../../constants/theme';

// Components
import Text from './Text';

// Styles
const styles = StyleSheet.create({
  switchButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  switchIcon: {
    width: 17,
    height: 17,
    borderColor: THEME.COLOR.MAIN_COLOR,
    borderWidth: 2,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 5,
  },
  switchInnerIcon: {
    width: 8,
    height: 8,
    borderRadius: 9,
    backgroundColor: THEME.COLOR.MAIN_COLOR,
  },
  switchButtonText: {
    fontSize: 15,
    fontWeight: '500',
    color: THEME.COLOR.MAIN_COLOR,
  },
});

function Switch({onPress, label, active, buttonStyle}) {
  return (
    <Pressable onPress={onPress} style={[styles.switchButton, buttonStyle]}>
      <View style={styles.switchIcon}>
        {active && <View style={styles.switchInnerIcon} />}
      </View>
      <Text style={styles.switchButtonText}>{label}</Text>
    </Pressable>
  );
}

export default Switch;
