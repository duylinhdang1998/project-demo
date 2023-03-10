import { PaymentStatus } from 'models/PaymentStatus';

export interface PassengerInTicketSale {
  firstName: string;
  lastName: string;
  typeTicket: 'ADULT'; // FIXME: Enum
  seatsType: 'ECO'; // FIXME: Enum
  price: number;
}

export interface TicketSale {
  _id: string;
  orderCode: string;
  company: string;
  route: string;
  departureTime: number;
  departurePoint: string;
  arrivalPoint: string;
  totalPrice: number;
  passengers: PassengerInTicketSale[];
  email: string;
  paymentStatus: PaymentStatus;
  creator: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
