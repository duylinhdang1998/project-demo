import { Route } from 'services/models/Route';
import { DeleteRoute } from 'services/Route/Company/deleteRoute';

export type DeleteRouteRequest = DeleteRoute & {
  onSuccess: () => void;
  onFailure: OnFailureWithMessageOfStatusCode;
};

export interface DeleteRouteSuccess {
  routeCode: Route['routeCode'];
}

export interface DeleteRouteFailure {
  routeCode: Route['routeCode'];
}
