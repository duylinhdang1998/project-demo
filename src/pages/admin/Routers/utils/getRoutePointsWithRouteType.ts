import { Route } from 'services/models/Route';

export const getMainRoutePoints = (routePoints: Route['routePoints']) => {
  return routePoints.filter(routePoint => routePoint.routeType === 'MAIN_ROUTE');
};

export const getSubRoutePoints = (routePoints: Route['routePoints']) => {
  return routePoints.filter(routePoint => routePoint.routeType === 'SUB_ROUTE');
};
