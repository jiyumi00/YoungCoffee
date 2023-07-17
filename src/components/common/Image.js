import React from 'react';
import { Platform, Image as RNImage } from 'react-native';

const RESIZE_MODE = Platform.OS === 'ios' ? 'contain' : 'center';

function Image(props) {
    return <RNImage {...props} resizeMode={RESIZE_MODE} />;
}

export default Image;
