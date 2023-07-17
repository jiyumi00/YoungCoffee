import React from 'react';
import { StyleSheet } from 'react-native';

// Components
import Image from './Image';

// Images
const LogoImage = require('../../assets/images/logo/logo.png');

// Styles
const styles = StyleSheet.create({
    logo: {
        width: 36,
    },
});

function Logo() {
    return <Image style={styles.logo} source={LogoImage} />;
}

export default Logo;
