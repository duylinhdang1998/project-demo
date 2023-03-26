import dayjs from 'dayjs';

interface AnyToMoment {
  value: any;
}

export const toDayjs = ({ value }: AnyToMoment) => {
  return dayjs(value);
};
