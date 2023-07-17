import dayjs from 'dayjs';

export const monthFormat = month => (month < 10 ? `0${month}` : month);

export const dateFormat = timestamp => dayjs(timestamp).format('YYYY년MM월DD');

export const timeFormat = timestamp => dayjs(timestamp).format('HH:mm');

export const dateMonthFormat = timestamp => dayjs(timestamp).format('YYYY년 MM월');
