import { Passenger } from 'services/models/Passenger';
import { GetPassengers } from 'services/Passenger/getPassengers';

export type GetPassengersRequest = GetPassengers;

export interface GetPassengersSuccess {
  data: Passenger[];
  totalPages: number;
  totalRows: number;
  page: GetPassengers['page'];
  searcher: GetPassengers['searcher'];
}

export interface GetPassengersFailure {}
