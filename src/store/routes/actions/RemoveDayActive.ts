import { Route } from 'services/models/Route';
import { RemoveDayActive } from 'services/Route/Company/removeDayActive';

// Create dayoffs
export interface RemoveDayActiveRequest {
  data: RemoveDayActive;
  onSuccess: () => void;
  onFailure: () => void;
}

export interface RemoveDayActiveSuccess {
  data: Route;
}

export interface RemoveDayActiveFailure {}
