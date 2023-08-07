import {Platform} from 'react-native';

export const onUpdateNumbersOnly = text => text.replace(/[^0-9]/g, '');

export const numberKeyboardType =
  Platform.OS === 'android' ? 'numeric' : 'number-pad';

export const keyboardBehavior = Platform.OS === 'ios' ? 'padding' : '';
