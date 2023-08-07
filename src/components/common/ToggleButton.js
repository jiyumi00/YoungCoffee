import React from 'react';
import {Pressable, StyleSheet, View} from 'react-native';

// Constants
import {THEME} from '../../constants/theme';

// styles
const styles = StyleSheet.create({
  toggle: {
    width: 50,
    height: 26,
    backgroundColor: THEME.COLOR.SILVER,
    borderRadius: 24,
    justifyContent: 'center',
    paddingHorizontal: 6,
  },
  activeToggle: {
    alignItems: 'flex-end',
    backgroundColor: THEME.COLOR.SUB_COLOR,
  },
  innerToggle: {
    width: 17,
    height: 17,
    borderRadius: 17,
    backgroundColor: THEME.COLOR.WHITE_COLOR,
  },
});

function ToggleButton({active, onPress}) {
  return (
    <Pressable
      style={[styles.toggle, active ? styles.activeToggle : null]}
      onPress={onPress}>
      <View style={styles.innerToggle} />
    </Pressable>
  );
}

export default ToggleButton;
