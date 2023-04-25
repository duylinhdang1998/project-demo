import { Route } from 'services/models/Route';
import { UpdateGeneralInfomationTrip } from 'services/Route/Company/updateGeneralInfomationTrip';

export interface UpdateTripRequest extends UpdateGeneralInfomationTrip {
  onSuccess: () => void;
  onFailure: OnFailureWithMessageOfStatusCode;
}

export interface UpdateTripSuccess {
  data: Route;
}

export interface UpdateTripFailure {}