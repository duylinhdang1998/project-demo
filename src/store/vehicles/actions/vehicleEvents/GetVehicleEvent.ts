import { VehicleEvent } from 'services/models/Vehicle';
import { GetVehicleEvent } from 'services/Vehicle/Company/getVehicleEvent';

export type GetVehicleEventRequest = GetVehicleEvent;

export interface GetVehicleEventSuccess {
  vehicleEvent: VehicleEvent;
}

export interface GetVehicleEventFailure {}
