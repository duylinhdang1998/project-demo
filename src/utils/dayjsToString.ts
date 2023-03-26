import dayjs from 'dayjs';

export const dayjsToString = (value: dayjs.Dayjs, format: string) => {
  return value.format(format);
};
