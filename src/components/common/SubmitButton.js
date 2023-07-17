import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

// Constants
import { THEME } from '../../constants/theme';
import Text from './Text';

// Styles
const styles = StyleSheet.create({
    submitButton: {
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: THEME.COLOR.MAIN_COLOR,
        borderRadius: 2,
    },
    submitDisabledButton: {
        backgroundColor: THEME.COLOR.DISABLED_COLOR,
    },
    submitButtonText: {
        fontSize: 17,
        fontWeight: '500',
        color: THEME.COLOR.WHITE_COLOR,
    },
});

function SubmitButton({ label, onSubmit, disabled, ...props }) {
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
        </TouchableOpacity>
    );
}

export default SubmitButton;
