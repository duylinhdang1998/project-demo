import { Event } from 'react-big-calendar';
import { DayInWeekMappingToString } from 'services/models/DayInWeek';
import { Staff } from 'services/models/Staff';
import { createArrayDateFromRange } from 'utils/createArrayDateFromRange';
import { isTimestampEqualDayInYear } from 'utils/handleTimestampWithDayInYear';

export const getDayoffsOutsidePresenceDay = (staff: Staff, title: string): Event[] => {
  return typeof staff.periodFrom === 'number' && typeof staff.periodTo === 'number'
    ? createArrayDateFromRange({
        start: staff.periodFrom,
        end: staff.periodTo,
        isNeedIgnore(date) {
          return staff.presenceDay.includes(DayInWeekMappingToString[date.getDay()]);
        },
      }).reduce<Event[]>((result, item) => {
        if (staff.dayExceptions.find(dayException => isTimestampEqualDayInYear(item, dayException))) {
          return result;
        } else {
          return result.concat({
            start: new Date(item),
            end: new Date(item),
            allDay: true,
            title,
          });
        }
      }, [])
    : [];
};
