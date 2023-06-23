import { Event } from 'react-big-calendar';
import { Route } from 'services/models/Route';
import { isTimestampEqualDayInYear } from 'utils/handleTimestampWithDayInYear';

export const getEditedDaysEvent = (route: Route, title: string) => {
  return route.particularDays.reduce<Event[]>((result, particularDay) => {
    if (route.dayoffs.find(dayoff => isTimestampEqualDayInYear(particularDay, dayoff))) {
      return result;
    } else {
      return result.concat({
        start: new Date(particularDay),
        end: new Date(particularDay),
        allDay: true,
        title,
      });
    }
  }, []);
};
