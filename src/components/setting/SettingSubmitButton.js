import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

// Constants
import { THEME } from '../../constants/theme';

const SettingSubmitButton = ({ disabled, onPress, label }) => {
    return (
        <TouchableOpacity
            style={[styles.button, disabled ? styles.disabledButton : null]}
            disabled={disabled}
            onPress={onPress}
            activeOpacity={0.9}>
            <Text style={styles.buttonText}>{label}</Text>
        </TouchableOpacity>
    );
};

export default SettingSubmitButton;

const styles = StyleSheet.create({
    button: {
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: THEME.COLOR.MAIN_COLOR,
    },
    disabledButton: {
        backgroundColor: THEME.COLOR.DISABLED_COLOR,
    },
    buttonText: {
        fontSize: 17,
        fontWeight: '500',
        color: THEME.COLOR.WHITE_COLOR,
    },
});
