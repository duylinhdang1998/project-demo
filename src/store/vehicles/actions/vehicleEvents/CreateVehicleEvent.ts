import { VehicleEvent } from 'services/models/Vehicle';
import { CreateVehicleEvent } from 'services/Vehicle/Company/createVehicleEvent';

export interface CreateVehicleEventRequest {
  data: CreateVehicleEvent;
  onSuccess: () => void;
  onFailure: OnFailureWithMessageOfStatusCode;
}

export interface CreateVehicleEventSuccess {
  data: VehicleEvent;
}

export interface CreateVehicleEventFailure {}
