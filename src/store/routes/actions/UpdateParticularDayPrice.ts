import { Route } from 'services/models/Route';
import { UpdateParticular } from 'services/Route/Company/updateParticular';

export interface UpdateParticularDayPriceRequest {
  data: UpdateParticular;
  onSuccess: () => void;
  onFailure: OnFailureWithMessageOfStatusCode;
}

export interface UpdateParticularDayPriceSuccess {
  data: Route;
}

export interface UpdateParticularDayPriceFailure {}
