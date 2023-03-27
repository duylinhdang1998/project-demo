import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(customParseFormat);

export const addMinutesToTimeString = (timeString: string, minutes: number) => {
  return dayjs(timeString, 'HH:mm').add(minutes, 'minute').format('HH:mm');
};
