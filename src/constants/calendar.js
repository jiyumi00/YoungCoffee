import { THEME } from './theme';

/**
 * Calendar theme
 */
export const CALENDAR_THEME = {
    todayTextColor: THEME.COLOR.BLUE_COLOR,
    todayButtonFontFamily: 'Pretendard-SemiBold',
    selectedDayBackgroundColor: '#ddd',
    textDayFontSize: 13,
    textDayHeaderFontSize: 13,
    'stylesheet.calendar.header': {
        header: {
            marginVertical: 15,
            justifyContent: 'center',
            alignItems: 'center',
        },
        monthText: {
            fontFamily: 'Pretendard-SemiBold',
            fontSize: 18,
            color: '#000',
            textAlign: 'left',
        },
        dayTextAtIndex0: {
            color: 'red',
        },
        dayTextAtIndex6: {
            color: 'green',
        },
    },
};

export const CALENDAR_COLORS = ['#E868A0', '#295CC5', '#18ABA1'];
