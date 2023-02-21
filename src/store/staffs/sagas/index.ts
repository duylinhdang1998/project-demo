import { watchCreateStaff } from './watchCreateStaff';
import { watchDeleteStaff } from './watchDeleteStaff';
import { watchGetStaff } from './watchGetStaff';
import { watchGetStaffs } from './watchGetStaffs';
import { watchRemoveDayActive } from './watchRemoveDayActive';
import { watchUpdateActiveDays } from './watchUpdateActiveDays';

export const staffsSagas = [watchCreateStaff, watchGetStaffs, watchGetStaff, watchDeleteStaff, watchRemoveDayActive, watchUpdateActiveDays];
