import React from 'react';
import {StyleSheet, TextInput, View} from 'react-native';

// Constants
import {THEME} from '../../constants/theme';

// styles
const styles = StyleSheet.create({
  inputWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    color: THEME.COLOR.MAIN_COLOR,
    borderColor: THEME.COLOR.LIGHT_GRAY,
    borderWidth: 1,
    borderStyle: 'solid',
    paddingHorizontal: 12,
    height: 40,
    fontFamily: 'Pretendard-Regular',
    fontSize: 16,
  },
  editable: {
    backgroundColor: '#f6f6f6',
  },
});

function Input(props) {
  const {editable, icon} = props;

  return (
    <View style={styles.inputWrap}>
      <TextInput
        placeholderTextColor={THEME.COLOR.SILVER}
        style={[styles.input, editable === false ? styles.editable : null]}
        {...props}
      />
      {icon ?? null}
    </View>
  );
}

export default Input;
