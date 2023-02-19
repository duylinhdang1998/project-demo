import { Route } from 'services/models/Route';
import { CreateMultipleStopTrip } from 'services/Route/Company/createMultipleStopTrip';

export interface CreateMultipleStopTripRequest {
  data: CreateMultipleStopTrip;
  onSuccess: () => void;
  onFailure: () => void;
}

export interface CreateMultipleStopTripSuccess {
  data: Route;
}

export interface CreateMultipleStopTripFailure {}
