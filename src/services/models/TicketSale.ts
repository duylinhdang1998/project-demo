import { PaymentStatus } from 'models/PaymentStatus';
import { PaymentGateway } from './PaymentGateway';
import { UserRole } from './UserRole';
import { RoutePointPrice } from './Route';

export interface PassengerInTicketSale {
  firstName: string;
  lastName: string;
  typeTicket: keyof RoutePointPrice;
  seatsType: 'ECO' | 'VIP';
}

export interface TicketSale {
  _id: string;
  orderCode: string;
  company: string;
  route: string;
  vehicle: string;
  departureTime: number;
  day: string;
  departurePoint: string;
  arrivalPoint: string;
  totalPrice: number;
  totalPax: number;
  ECOseated: number;
  VIPseated: number;
  passengers: PassengerInTicketSale[];
  email: string;
  paymentStatus: PaymentStatus;
  paymentType: PaymentGateway;
  creator: string;
  creatorType: UserRole;
  createdAt: string;
  updatedAt: string;
  __v: number;
  payment: string;
}
