import {THEME} from './theme';

/**
 * Calendar theme
 */
export const CALENDAR_THEME = {
  'stylesheet.calendar.header': {
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 10,
      marginBottom: 16,
    },
    week: {
      marginTop: 0,
      flexDirection: 'row',
      justifyContent: 'space-around',
    },
    dayHeader: {
      margin: 0,
      width: 32,
      textAlign: 'center',
      fontSize: 13,
      fontFamily: 'Pretendard-Medium',
      fontWeight: '500',
      color: THEME.COLOR.GRAY_COLOR,
    },
    dayTextAtIndex0: {
      color: '#ff0000',
    },
    dayTextAtIndex6: {
      color: '#295CC5',
    },
  },
  'stylesheet.calendar.main': {
    container: {
      padding: 0,
    },
  },
};

export const CALENDAR_COLORS = ['#E868A0', '#295CC5', '#18ABA1'];
