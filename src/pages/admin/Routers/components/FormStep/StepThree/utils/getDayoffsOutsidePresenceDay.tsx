import { Event } from 'react-big-calendar';
import { DayInWeekMappingToString } from 'services/models/DayInWeek';
import { Route } from 'services/models/Route';
import { createArrayDateFromRange } from 'utils/createArrayDateFromRange';

export const getDayoffsOutsidePresenceDay = (route: Route, title: string): Event[] => {
  return typeof route.startPeriod === 'number' && typeof route.endPeriod === 'number'
    ? createArrayDateFromRange({
        start: route.startPeriod,
        end: route.endPeriod,
        isNeedIgnore(date) {
          return route.dayActives.includes(DayInWeekMappingToString[date.getDay()]);
        },
      }).reduce<Event[]>((result, item) => {
        return result.concat({
          start: new Date(item),
          end: new Date(item),
          allDay: true,
          title,
        });
      }, [])
    : [];
};
