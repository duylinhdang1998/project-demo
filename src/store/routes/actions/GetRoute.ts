import { Route } from 'services/models/Route';
import { GetRoute } from 'services/Route/Company/getRoute';

export type GetRouteRequest = GetRoute;

export interface GetRouteSuccess {
  data: Route;
}

export interface GetRouteFailure {}
