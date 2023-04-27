import { watchCreateMultipleStopTrip } from './watchCreateMultipleStopTrip';
import { watchCreateOneStopTrip } from './watchCreateOneStopTrip';
import { watchDeleteRoute } from './watchDeleteRoute';
import { watchGetRoute } from './watchGetRoute';
import { watchGetRoutes } from './watchGetRoutes';
import { watchToggleDayActive } from './watchToggleDayActive';
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
  watchToggleDayActive,
  watchUpdateActiveDays,
  watchUpdateParticularDayPrice,
  watchUpdateTrip,
  watchUpdateRoutePointPrice,
];
