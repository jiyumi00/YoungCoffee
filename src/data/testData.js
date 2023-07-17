import { CALENDAR_COLORS } from '../constants/calendar';

export const testMarkedDates = {
    '2023-06-01': [
        {
            key: '1', // userID?
            name: '김가가',
            color: CALENDAR_COLORS[0],
        },
        {
            key: '2',
            name: '이나나',
            color: CALENDAR_COLORS[1],
        },
        {
            key: '3',
            name: '박다다',
            color: CALENDAR_COLORS[2],
        },
    ],
    '2023-06-02': [
        {
            key: '2',
            name: '이나나',
            color: CALENDAR_COLORS[1],
        },
        {
            key: '3',
            name: '박다다',
            color: CALENDAR_COLORS[2],
        },
    ],
    '2023-06-03': [
        {
            key: '2',
            name: '이나나',
            color: CALENDAR_COLORS[1],
        },
        {
            key: '3',
            name: '박다다',
            color: CALENDAR_COLORS[2],
        },
    ],
    '2023-06-04': [
        {
            key: '1', // userID?
            name: '김가가',
            color: CALENDAR_COLORS[0],
        },
        {
            key: '2',
            name: '이나나',
            color: CALENDAR_COLORS[1],
        },
        {
            key: '3',
            name: '박다다',
            color: CALENDAR_COLORS[2],
        },
    ],
};

export const TEST_SETTLEMENT_LIST = [
    {
        year: 2023,
        month: 6,
        state: 1,
    },
    {
        year: 2023,
        month: 5,
        state: 2,
    },
    {
        year: 2023,
        month: 4,
        state: 2,
    },
    {
        year: 2023,
        month: 3,
        state: 2,
    },
];
