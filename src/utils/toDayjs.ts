import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(customParseFormat);

interface AnyToMoment {
  value: any;
  format?: dayjs.OptionType;
}

export const toDayjs = ({ value, format }: AnyToMoment) => {
  return dayjs(value, format);
};
