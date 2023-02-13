import { Vehicle } from 'services/models/Vehicle';
import { GetVehicle } from 'services/Vehicle/Company/getVehicle';

export type GetVehicleRequest = GetVehicle;

export interface GetVehicleSuccess {
  data: Vehicle;
}

export interface GetVehicleFailure {}
