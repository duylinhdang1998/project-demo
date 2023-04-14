import { Vehicle } from 'services/models/Vehicle';
import { CreateVehicle } from 'services/Vehicle/Company/createVehicle';

export interface CreateVehicleRequest {
  data: CreateVehicle;
  onSuccess: () => void;
  onFailure: OnFailureWithMessageOfStatusCode;
}

export interface CreateVehicleSuccess {
  data: Vehicle;
}

export interface CreateVehicleFailure {}
