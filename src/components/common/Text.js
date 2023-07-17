import React from 'react';
import { Text as RNText } from 'react-native';

const FONT_WEIGHT = {
    '100': 'Thin',
    '200': 'ExtraLight',
    '300': 'Light',
    '400': 'Regular',
    '500': 'Medium',
    '600': 'SemiBold',
    '700': 'Bold',
    '800': 'ExtraBold',
    '900': 'Black',
};

/**
 * @title 커스텀 폰트 설정
 * @returns
 */
function Text({ children, style, ...rest }) {
    const fontWeight = FONT_WEIGHT[style.fontWeight] ?? FONT_WEIGHT[400];
    const fontFamily = `Pretendard-${fontWeight}`;

    return (
        <RNText style={[style, { fontFamily }]} {...rest}>
            {children}
        </RNText>
    );
}

export default Text;
