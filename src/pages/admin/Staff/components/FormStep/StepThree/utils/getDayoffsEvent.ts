import { Event } from 'react-big-calendar';
import { Staff } from 'services/models/Staff';

export const getDayoffsEvent = (staff: Staff, title: string) => {
  return staff.dayOff.map<Event>(dayoff => ({
    start: new Date(dayoff),
    end: new Date(dayoff),
    allDay: true,
    title: title,
  }));
};
