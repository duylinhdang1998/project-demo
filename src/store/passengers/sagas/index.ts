import { watchGetPassenger } from './watchGetPassenger';
import { watchGetPassengers } from './watchGetPassengers';
import { watchSendEmail } from './watchSendEmail';
import { watchUpdatePassenger } from './watchUpdatePassenger';
import { watchUpdateStatusPassenger } from './watchUpdateStatusPassenger';

export const passengersSagas = [watchGetPassengers, watchGetPassenger, watchSendEmail, watchUpdatePassenger, watchUpdateStatusPassenger];
