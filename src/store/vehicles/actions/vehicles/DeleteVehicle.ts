import { Vehicle } from 'services/models/Vehicle';
import { DeleteVehicle } from 'services/Vehicle/Company/deleteVehicle';

export type DeleteVehicleRequest = DeleteVehicle & {
  onSuccess: () => void;
  onFailure: OnFailureWithMessageOfStatusCode;
};

export interface DeleteVehicleSuccess {
  id: Vehicle['_id'];
}

export interface DeleteVehicleFailure {
  id: Vehicle['_id'];
}
