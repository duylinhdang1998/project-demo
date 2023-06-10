import { Event } from 'react-big-calendar';
import { Staff } from 'services/models/Staff';
import { isTimestampEqualDayInYear } from 'utils/handleTimestampWithDayInYear';

export const getDayoffsEvent = (staff: Staff, title: string) => {
  return staff.dayOff.reduce<Event[]>((result, dayoff) => {
    if (staff.dayExceptions.find(dayException => isTimestampEqualDayInYear(dayoff, dayException))) {
      return result;
    } else {
      return result.concat({
        start: new Date(dayoff),
        end: new Date(dayoff),
        allDay: true,
        title,
      });
    }
  }, []);
};
