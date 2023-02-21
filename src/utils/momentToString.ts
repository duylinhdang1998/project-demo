import { isMoment } from 'moment';

export const momentToString = (value: any, format: string) => {
  return isMoment(value) ? value.format(format) : value;
};
