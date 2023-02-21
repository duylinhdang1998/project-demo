import { VehicleEvent } from 'services/models/Vehicle';
import { GetVehicleEvents } from 'services/Vehicle/Company/getVehicleEvents';

export type GetVehicleEventsRequest = GetVehicleEvents & {};

export interface GetVehicleEventsSuccess {
  vehicleEvents: VehicleEvent[];
  totalPages: number;
  totalRows: number;
  page: GetVehicleEvents['page'];
  searcher: GetVehicleEvents['searcher'];
}

export interface GetVehicleEventsFailure {}
