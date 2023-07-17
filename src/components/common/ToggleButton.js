import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

// Constants
import { THEME } from '../../constants/theme';

// styles
const styles = StyleSheet.create({
    toggle: {
        width: 54,
        height: 28,
        backgroundColor: THEME.COLOR.SILVER,
        borderRadius: 28,
        justifyContent: 'center',
        paddingHorizontal: 6,
    },
    activeToggle: {
        alignItems: 'flex-end',
        backgroundColor: THEME.COLOR.SUB_COLOR,
    },
    innerToggle: {
        width: 18,
        height: 18,
        borderRadius: 18,
        backgroundColor: THEME.COLOR.WHITE_COLOR,
    },
});

function ToggleButton({ active, onPress }) {
    return (
        <Pressable
            style={[styles.toggle, active ? styles.activeToggle : null]}
            onPress={onPress}>
            <View style={styles.innerToggle} />
        </Pressable>
    );
}

export default ToggleButton;
