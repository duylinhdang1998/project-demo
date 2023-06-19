import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(customParseFormat);

interface AnyToMoment {
  value: any;
  format?: dayjs.OptionType;
}

export const toDayjs = ({ value, format }: AnyToMoment) => {
  const valueInDayjs = dayjs(value, format);
  return valueInDayjs.isValid() ? valueInDayjs : undefined;
};
