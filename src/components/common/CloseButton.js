import React, { useCallback } from 'react';
import { StyleSheet, Pressable } from 'react-native';

// Components
import Image from './Image';
import { useNavigation } from '@react-navigation/native';

// Images
const CloseIcon = require('../../assets/images/close/close.png');

// Close Button은 보통 이전 스크린으로 돌아가기 위해 사용하기 때문에 미리 함수를 구현해둠
const CloseButton = (...props) => {
    const navigation = useNavigation();
    const onPress = useCallback(() => {
        navigation.goBack();
    }, [navigation]);

    return (
        <Pressable {...props} onPress={onPress}>
            <Image source={CloseIcon} style={styles.closeIcon} />
        </Pressable>
    );
};

export default CloseButton;

// Styles
const styles = StyleSheet.create({
    closeIcon: {
        width: 25,
        height: 25,
    },
});
