import React from 'react';
import { StyleSheet, View } from 'react-native';

// Constants
import { THEME } from '../../constants/theme';

// Components
import Text from './Text';

// Styles
const styles = StyleSheet.create({
    inputBox: {
        marginBottom: 30,
    },
    label: {
        fontSize: 14,
        fontWeight: '500',
        color: THEME.COLOR.SUB_COLOR,
        marginBottom: 4,
    },
});

function InputBox({ label, input, viewStyle = {}, textStyle = {} }) {
    return (
        <View style={[styles.inputBox, viewStyle]}>
            <Text style={{ ...styles.label, ...textStyle }}>{label}</Text>
            {input}
        </View>
    );
}

export default InputBox;
