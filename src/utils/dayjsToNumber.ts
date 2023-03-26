import dayjs from 'dayjs';

export const dayjsToNumber = (value: dayjs.Dayjs) => {
  return value.valueOf();
};
