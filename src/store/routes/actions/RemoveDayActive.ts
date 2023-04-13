import { Route } from 'services/models/Route';
import { RemoveDayActive } from 'services/Route/Company/removeDayActive';

// Create dayoffs
export interface RemoveDayActiveRequest {
  data: RemoveDayActive;
  routeCode: Route['routeCode'];
  onSuccess: () => void;
  onFailure: OnFailureWithMessageOfStatusCode;
}

export interface RemoveDayActiveSuccess {
  data: Route;
}

export interface RemoveDayActiveFailure {}
