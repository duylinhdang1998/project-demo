import moment, { isMoment } from 'moment';

export const anyToMoment = (value: any) => {
  return !value ? undefined : isMoment(value) ? value : moment(value);
};
