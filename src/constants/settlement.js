import { THEME } from './theme';

export const settlementState = {
    0: {
        label: '마감 전',
        color: THEME.COLOR.VIOLET_COLOR,
    },
    1: {
        label: '완료',
        color: THEME.COLOR.GRAY_COLOR,
    },
};

export const historyType = {
    1: '월급',
    2: '상여금',
    3: '급여',
    4: '주휴수당',
    5: '보너스',
};
