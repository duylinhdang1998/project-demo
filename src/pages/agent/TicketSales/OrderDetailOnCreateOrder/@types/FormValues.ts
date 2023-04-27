import { Option } from 'models/Field';
import { Key } from 'react';
import { PassengerInTicketSale } from 'services/models/TicketSale';

export interface Passenger {
  uniqKey: Key;
  firstName: PassengerInTicketSale['firstName'];
  lastName: PassengerInTicketSale['lastName'];
  typeTicket: Option<PassengerInTicketSale['typeTicket']>;
  seatsType: Option<PassengerInTicketSale['seatsType']>;
}

export interface TicketDetailFormValues {
  email: string;
  passengers: Passenger[];
  accept_term: boolean;
}
