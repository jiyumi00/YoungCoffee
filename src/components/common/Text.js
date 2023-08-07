import React from 'react';
import {Platform, Text as RNText} from 'react-native';

const FONT_WEIGHT = {
  100: 'Thin',
  200: 'ExtraLight',
  300: 'Light',
  400: 'Regular',
  500: 'Medium',
  600: 'SemiBold',
  700: 'Bold',
  800: 'ExtraBold',
  900: 'Black',
};

/**
 * @title 커스텀 폰트 설정
 * @returns
 */
function Text({children, style, fontWeight = 400, ...rest}) {
  const fontWeightValue = FONT_WEIGHT[fontWeight] ?? FONT_WEIGHT[400];
  const fontFamily = `Pretendard-${fontWeightValue}`;

  // Android Bold 적용되지 않는 이슈 해결
  const fontWeightStyle = Platform.OS === 'ios' ? `${fontWeight}` : 'normal';

  return (
    <RNText
      style={[style, {fontFamily, fontWeight: fontWeightStyle}]}
      {...rest}>
      {children}
    </RNText>
  );
}

export default Text;
