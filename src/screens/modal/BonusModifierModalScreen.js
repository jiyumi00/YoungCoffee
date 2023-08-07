import React, {useState} from 'react';
import {StyleSheet, View, TextInput, KeyboardAvoidingView} from 'react-native';

// Components
import ModalContainer from '../../components/modal/ModalContainer';
import Text from '../../components/common/Text';

// Constants
import {THEME} from '../../constants/theme';

// Utils
import {amountFormat} from '../../utils/AmountFormat';
import {numberKeyboardType, onUpdateNumbersOnly} from '../../utils/keyboard';

// Styles
const styles = StyleSheet.create({
  contents: {
    padding: 15,
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 25,
  },
  headerText: {
    fontSize: 16,
    fontWeight: '500',
    color: THEME.COLOR.MAIN_COLOR,
    lineHeight: 24,
  },
  headerPointText: {
    fontSize: 16,
    fontWeight: '500',
    color: THEME.COLOR.VIOLET_COLOR,
  },
  form: {
    paddingHorizontal: 30,
  },
  inputBox: {
    marginBottom: 25,
  },
  label: {
    marginBottom: 3,
  },
  labelText: {
    fontSize: 14,
    fontWeight: '500',
    color: THEME.COLOR.SUB_COLOR,
  },
  input: {
    flex: 1,
    height: 42,
    borderColor: THEME.COLOR.LIGHT_GRAY,
    borderWidth: 1,
    borderRadius: 2,
    textAlign: 'right',
    paddingHorizontal: 12,
    fontFamily: 'Pretendard-Regular',
    fontSize: 16,
    fontWeight: '600',
  },
  readOnlyInput: {
    backgroundColor: THEME.COLOR.GHOST_WHITE,
    color: THEME.COLOR.GRAY_COLOR,
  },
});

function BonusModifierModalScreen({route, navigation}) {
  const [newSum, setNewSum] = useState('');
  const {data} = route.params;

  const onClose = () => {
    navigation.goBack();
  };

  // 업데이트 API  요청
  const onUpdateValue = () => {
    onClose();
  };

  // 새로운 금액 인풋 업데이트
  const handleNumericInputChange = text => setNewSum(onUpdateNumbersOnly(text));

  return (
    <ModalContainer
      buttons={[
        {id: 0, label: '취소', onPress: onClose},
        {id: 1, label: '확인', onPress: onUpdateValue},
      ]}
      onClose={onClose}>
      <KeyboardAvoidingView style={styles.contents} behavior="padding">
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerText}>
            {data.name}({data.employeeType})님의
            <Text style={styles.headerPointText}> 5월 상여금</Text>을
          </Text>

          <Text style={styles.headerText}>수정하시겠습니까?</Text>
        </View>

        {/* Form */}
        <View style={styles.form}>
          {/* Previous Value */}
          <View style={styles.inputBox}>
            <View style={styles.label}>
              <Text style={styles.labelText}>이전 금액</Text>
            </View>
            <TextInput
              style={[styles.input, styles.readOnlyInput]}
              value={amountFormat(data.amount)}
              editable={false}
            />
          </View>

          {/* New Value */}
          <View style={styles.inputBox}>
            <View style={styles.label}>
              <Text style={styles.labelText}>변경 금액</Text>
            </View>
            <TextInput
              style={styles.input}
              value={newSum}
              onChangeText={handleNumericInputChange}
              placeholder="변경할 금액을 입력해주세요."
              keyboardType={numberKeyboardType}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </ModalContainer>
  );
}

export default BonusModifierModalScreen;
