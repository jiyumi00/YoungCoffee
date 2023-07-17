import { StyleSheet, View } from 'react-native';
import React from 'react';
import { THEME } from '../../constants/theme';

const styles = StyleSheet.create({
    line: { height: 1, width: '100%', backgroundColor: THEME.COLOR.LIGHT_GRAY },
});

function Line() {
    return <View style={styles.line} />;
}

export default Line;
