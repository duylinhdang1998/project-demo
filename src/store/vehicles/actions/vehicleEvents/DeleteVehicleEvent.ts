import { VehicleEvent } from 'services/models/Vehicle';
import { DeleteVehicleEvent } from 'services/Vehicle/Company/deleteVehicleEvent';

export type DeleteVehicleEventRequest = DeleteVehicleEvent & {
  onSuccess: () => void;
  onFailure: () => void;
};

export interface DeleteVehicleEventSuccess {
  id: VehicleEvent['_id'];
}

export interface DeleteVehicleEventFailure {
  id: VehicleEvent['_id'];
}
