import React from 'react';
import {Platform, StyleSheet, TouchableOpacity, View} from 'react-native';

// Constants
import {THEME} from '../../constants/theme';
import Text from './Text';
import {SafeAreaView} from 'react-native-safe-area-context';
import useKeyboardCheck from '../../hooks/useKeyboardCheck';

// Styles
const styles = StyleSheet.create({
  area: {
    backgroundColor: THEME.COLOR.MAIN_COLOR,
  },
  submitButton: {
    paddingVertical: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: THEME.COLOR.MAIN_COLOR,
  },
  submitDisabledButton: {
    backgroundColor: THEME.COLOR.DISABLED_COLOR,
  },
  submitButtonText: {
    fontSize: 18,
    fontWeight: '500',
    color: THEME.COLOR.WHITE_COLOR,
  },
});

function SubmitButton({
  label,
  onSubmit,
  disabled,
  bottomInset = true,
  ...props
}) {
  // const {isKeyboardVisible} = useKeyboardCheck();

  return (
    <TouchableOpacity
      style={[
        styles.submitButton,
        disabled ? styles.submitDisabledButton : null,
      ]}
      onPress={onSubmit}
      disabled={disabled}
      activeOpacity={0.9}
      {...props}>
      <Text style={styles.submitButtonText}>{label}</Text>
      {/* (희애) 키보드가 열렸을 경우에는 패딩 주지 않기 */}
      {/* {!isKeyboardVisible && bottomInset && <SafeAreaView edges={['bottom']} />} */}
      {bottomInset && <SafeAreaView edges={['bottom']} />}
    </TouchableOpacity>
  );
}

export default SubmitButton;
