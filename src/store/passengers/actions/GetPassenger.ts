import { Passenger } from 'services/models/Passenger';
import { GetPassenger } from 'services/Passenger/getPassenger';

export type GetPassengerRequest = GetPassenger;

export interface GetPassengerSuccess {
  data: Passenger;
}

export interface GetPassengerFailure {}
