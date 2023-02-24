import { watchCreateStaff } from './watchCreateStaff';
import { watchDeleteStaff } from './watchDeleteStaff';
import { watchGetStaff } from './watchGetStaff';
import { watchGetStaffs } from './watchGetStaffs';
import { watchToggleDayActive } from './watchToggleDayActive';
import { watchUpdateActiveDays } from './watchUpdateActiveDays';
import { watchUpdateStaffInfo } from './watchUpdateStaffInfo';

export const staffsSagas = [
  watchCreateStaff,
  watchGetStaffs,
  watchGetStaff,
  watchDeleteStaff,
  watchToggleDayActive,
  watchUpdateActiveDays,
  watchUpdateStaffInfo,
];
