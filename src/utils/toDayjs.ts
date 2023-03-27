import dayjs from 'dayjs';

interface AnyToMoment {
  value: any;
  format?: dayjs.OptionType;
}

export const toDayjs = ({ value, format }: AnyToMoment) => {
  return dayjs(value, format);
};
