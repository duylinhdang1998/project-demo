import { watchCreateMultipleStopTrip } from './watchCreateMultipleStopTrip';
import { watchCreateOneStopTrip } from './watchCreateOneStopTrip';
import { watchDeleteRoute } from './watchDeleteRoute';
import { watchGetRoute } from './watchGetRoute';
import { watchGetRoutes } from './watchGetRoutes';
import { watchRemoveDayActive } from './watchRemoveDayActive';
import { watchUpdateRoutePointPrice } from './watchRoutePointPrice';
import { watchUpdateActiveDays } from './watchUpdateActiveDays';
import { watchUpdateParticularDayPrice } from './watchUpdateParticularDayPrice';
import { watchUpdateTrip } from './watchUpdateTrip';

export const routesSagas = [
  watchCreateMultipleStopTrip,
  watchCreateOneStopTrip,
  watchGetRoutes,
  watchGetRoute,
  watchDeleteRoute,
  watchRemoveDayActive,
  watchUpdateActiveDays,
  watchUpdateParticularDayPrice,
  watchUpdateTrip,
  watchUpdateRoutePointPrice,
];
