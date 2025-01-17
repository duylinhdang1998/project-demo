import { Vehicle } from 'services/models/Vehicle';
import { UpdateVehicle } from 'services/Vehicle/Company/updateVehicle';

export type UpdateVehicleRequest = UpdateVehicle & {
  targetVehicle: Vehicle;
  onSuccess: () => void;
  onFailure: OnFailureWithMessageOfStatusCode;
};

export interface UpdateVehicleSuccess {
  data: Vehicle;
}

export interface UpdateVehicleFailure {
  id: Vehicle['_id'];
}
