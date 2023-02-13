import { Vehicle } from 'services/models/Vehicle';
import { UpdateVehicle } from 'services/Vehicle/Company/updateVehicle';

export type UpdateVehicleRequest = UpdateVehicle & {
  onSuccess: () => void;
  onFailure: () => void;
};

export interface UpdateVehicleSuccess {
  data: Vehicle;
}

export interface UpdateVehicleFailure {
  id: Vehicle['_id'];
}
