import { watchDeleteRoute } from './watchDeleteRoute';
import { watchGetRoute } from './watchGetRoute';
import { watchGetRoutes } from './watchGetRoutes';

export const routesSagas = [watchGetRoutes, watchGetRoute, watchDeleteRoute];
