import { Passenger } from 'services/models/Passenger';
import { UpdatePassenger } from 'services/Passenger/updatePassenger';

export interface UpdatePassengerRequest extends UpdatePassenger {
  onSuccess: () => void;
  onFailure: OnFailureWithMessageOfStatusCode;
}

export interface UpdatePassengerSuccess {
  data: Passenger;
}

export interface UpdatePassengerFailure {
  id: Passenger['_id'];
}
