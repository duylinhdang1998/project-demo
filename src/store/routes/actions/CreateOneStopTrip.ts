import { Route } from 'services/models/Route';
import { CreateOneStopTrip } from 'services/Route/Company/createOneStopTrip';

export interface CreateOneStopTripRequest {
  data: CreateOneStopTrip;
  onSuccess: () => void;
  onFailure: () => void;
}

export interface CreateOneStopTripSuccess {
  data: Route;
}

export interface CreateOneStopTripFailure {}
