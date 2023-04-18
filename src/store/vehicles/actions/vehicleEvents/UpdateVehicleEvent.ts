import { VehicleEvent } from 'services/models/Vehicle';
import { UpdateVehicleEvent } from 'services/Vehicle/Company/updateVehicleEvent';

export type UpdateVehicleEventRequest = UpdateVehicleEvent & {
  targetVehicleEvent: VehicleEvent;
  onSuccess: () => void;
  onFailure: OnFailureWithMessageOfStatusCode;
};

export interface UpdateVehicleEventSuccess {
  data: VehicleEvent;
}

export interface UpdateVehicleEventFailure {
  id: VehicleEvent['_id'];
}
