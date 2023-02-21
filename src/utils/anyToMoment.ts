import moment, { isMoment, MomentFormatSpecification } from 'moment';

interface AnyToMoment {
  value: any;
  format?: MomentFormatSpecification;
}

export const anyToMoment = ({ value, format }: AnyToMoment) => {
  const valueInMomemt = !value ? undefined : isMoment(value) ? value : moment(value, format);
  return valueInMomemt;
};
