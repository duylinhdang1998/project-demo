import { Route } from 'services/models/Route';
import { UpdateActiveDays } from 'services/Route/Company/updateActiveDays';

export interface UpdateActiveDaysRequest {
  data: UpdateActiveDays;
  onSuccess: () => void;
  onFailure: () => void;
}

export interface UpdateActiveDaysSuccess {
  data: Route;
}

export interface UpdateActiveDaysFailure {}