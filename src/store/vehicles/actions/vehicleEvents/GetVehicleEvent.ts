import { VehicleEvent } from 'services/models/Vehicle';
import { GetVehicleEvent } from 'services/Vehicle/Company/getVehicleEvent';

export type GetVehicleEventRequest = GetVehicleEvent;

export interface GetVehicleEventSuccess {
  data: VehicleEvent;
}

export interface GetVehicleEventFailure {}
