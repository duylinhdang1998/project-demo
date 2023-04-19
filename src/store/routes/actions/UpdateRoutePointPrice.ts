import { Route } from 'services/models/Route';
import { UpdateRoutePointPrice } from 'services/Route/Company/updateRoutePointPrice';

export interface UpdateRoutePointPriceRequest extends UpdateRoutePointPrice {
  routeCode: Route['routeCode'];
  onSuccess: (route: Route) => void;
  onFailure: OnFailureWithMessageOfStatusCode;
}

export interface UpdateRoutePointPriceSuccess extends Pick<UpdateRoutePointPrice, 'routePointId'> {
  data: Route;
}

export type UpdateRoutePointPriceFailure = Pick<UpdateRoutePointPrice, 'routePointId'>;
