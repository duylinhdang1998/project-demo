import { watchCreateMultipleStopTrip } from './watchCreateMultipleStopTrip';
import { watchCreateOneStopTrip } from './watchCreateOneStopTrip';
import { watchDeleteRoute } from './watchDeleteRoute';
import { watchGetRoute } from './watchGetRoute';
import { watchGetRoutes } from './watchGetRoutes';
import { watchRemoveDayActive } from './watchRemoveDayActive';
import { watchUpdateActiveDays } from './watchUpdateActiveDays';
import { watchUpdateTicketPrices } from './watchUpdateTicketPrices';
import { watchUpdateTrip } from './watchUpdateTrip';

export const routesSagas = [
  watchCreateMultipleStopTrip,
  watchCreateOneStopTrip,
  watchGetRoutes,
  watchGetRoute,
  watchDeleteRoute,
  watchRemoveDayActive,
  watchUpdateActiveDays,
  watchUpdateTicketPrices,
  watchUpdateTrip,
];
