import { Event } from 'react-big-calendar';
import { Route } from 'services/models/Route';

export const getDayoffsEvent = (route: Route, title: string) => {
  return route.dayoffs.reduce<Event[]>((result, dayoff) => {
    return result.concat({
      start: new Date(dayoff),
      end: new Date(dayoff),
      allDay: true,
      title,
    });
  }, []);
};
