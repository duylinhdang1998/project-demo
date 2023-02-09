import { watchCreateOffice } from './watchCreateOffice';
import { watchDeleteOffice } from './watchDeleteOffice';
import { watchGetOffice } from './watchGetOffice';
import { watchGetOffices } from './watchGetOffices';
import { watchUpdateOffice } from './watchUpdateOffice';

export const officesManagerSagas = [watchGetOffices, watchGetOffice, watchCreateOffice, watchDeleteOffice, watchUpdateOffice];
