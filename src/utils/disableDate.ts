import dayjs, { Dayjs } from 'dayjs';

export const disabledDate = (current: Dayjs, bottom = dayjs(), top?: Dayjs) => {
  if (top) {
    return current && current < bottom.startOf('day') && current > top.startOf('day');
  }
  return current && current < bottom.startOf('day');
};
