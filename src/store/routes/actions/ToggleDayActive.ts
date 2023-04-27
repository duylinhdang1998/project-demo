import { Route } from 'services/models/Route';
import { ToggleDayActive } from 'services/Route/Company/toggleDayActive';

export interface ToggleDayActiveRequest {
  targetRoute: Route;
  data: ToggleDayActive;
  onSuccess: () => void;
  onFailure: OnFailureWithMessageOfStatusCode;
}

export interface ToggleDayActiveSuccess {
  data: Route;
}

export interface ToggleDayActiveFailure {}
