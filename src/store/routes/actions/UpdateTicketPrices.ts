import { Route } from 'services/models/Route';
import { UpdateParticular } from 'services/Route/Company/updateParticular';

export interface UpdateTicketPricesRequest {
  data: UpdateParticular;
  routeCode: Route['routeCode'];
  onSuccess: () => void;
  onFailure: () => void;
}

export interface UpdateTicketPricesSuccess {
  data: Route;
}

export interface UpdateTicketPricesFailure {}
