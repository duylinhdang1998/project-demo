import { Route } from 'services/models/Route';
import { RemoveDayActive } from 'services/Route/Company/removeDayActive';

// Create dayoffs
export interface RemoveDayActiveRequest {
  data: RemoveDayActive;
  routeId: Route['_id'];
  onSuccess: () => void;
  onFailure: () => void;
}

export interface RemoveDayActiveSuccess {
  data: Route;
}

export interface RemoveDayActiveFailure {}
