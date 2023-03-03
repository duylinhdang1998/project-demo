import { watchGetPassenger } from './watchGetPassenger';
import { watchGetPassengers } from './watchGetPassengers';
import { watchUpdatePassenger } from './watchUpdatePassenger';
import { watchUpdateStatusPassenger } from './watchUpdateStatusPassenger';

export const passengersSagas = [watchGetPassengers, watchGetPassenger, watchUpdatePassenger, watchUpdateStatusPassenger];
