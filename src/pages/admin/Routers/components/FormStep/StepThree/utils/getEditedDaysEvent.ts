import { Event } from 'react-big-calendar';
import { Route } from 'services/models/Route';
import { isTimestampEqualDayInYear } from 'utils/handleTimestampWithDayInYear';

export const getEditedDaysEvent = (route: Route, title: string) => {
  return route.particularDays.reduce<Event[]>((result, dayoff) => {
    if (route.dayoffs.find(dayoff => isTimestampEqualDayInYear(dayoff, dayoff))) {
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
