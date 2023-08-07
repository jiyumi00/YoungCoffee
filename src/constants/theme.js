import { Platform } from 'react-native';

export const THEME = {
    COLOR: {
        MAIN_COLOR: '#002572',
        SUB_COLOR: '#4764A8',
        BLUE_COLOR: '#295CC5',
        WHITE_COLOR: '#FFFFFF',
        BLACK_COLOR: '#07132E',
        GHOST_WHITE: '#F2F2F2',
        GRAY_COLOR: '#737B8E',
        SILVER: '#B8BBC1',
        DISABLED_COLOR: '#C7CCD6',
        // LIGHT_GRAY: '#D4D5D8',
        LIGHT_GRAY: '#E9E9E9',
        VIOLET_COLOR: '#BF0757',
    },
    CONTENTS_PADDING: {
        paddingVertical: 20,
        paddingHorizontal: 30,
    },
};
export const SHADOW =
    Platform.OS === 'ios'
        ? {
              shadowOffset: { width: 0, height: 2 },
              shadowRadius: 15,
              shadowOpacity: 0.35,
              shadowColor: THEME.COLOR.GRAY_COLOR,
          }
        : {
              elevation: 20,
              shadowColor: THEME.COLOR.BLUE_COLOR,
          };

          