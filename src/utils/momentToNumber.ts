import { isMoment } from 'moment';

export const momentToNumber = (value: any) => {
  return isMoment(value) ? value.valueOf() : value;
};
