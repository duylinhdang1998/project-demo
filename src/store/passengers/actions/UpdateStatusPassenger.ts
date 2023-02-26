import { Passenger } from 'services/models/Passenger';
import { UpdateStatusPassenger } from 'services/Passenger/updateStatusPassenger';

export interface UpdateStatusPassengerRequest extends UpdateStatusPassenger {
  onSuccess: () => void;
  onFailure: () => void;
}

export interface UpdateStatusPassengerSuccess {
  data: Passenger;
}

export interface UpdateStatusPassengerFailure {
  id: Passenger['_id'];
}
