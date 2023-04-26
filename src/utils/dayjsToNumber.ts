import dayjs from 'dayjs';

export const dayjsToNumber = (value: dayjs.Dayjs) => {
  return value?.isValid?.() ? value.valueOf() : 0;
};
