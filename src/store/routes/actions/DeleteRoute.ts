import { Route } from 'services/models/Route';
import { DeleteRoute } from 'services/Route/Company/deleteRoute';

export type DeleteRouteRequest = DeleteRoute & {
  onSuccess: () => void;
  onFailure: () => void;
};

export interface DeleteRouteSuccess {
  id: Route['_id'];
}

export interface DeleteRouteFailure {
  id: Route['_id'];
}
