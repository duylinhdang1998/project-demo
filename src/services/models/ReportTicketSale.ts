import { EPaymentStatus } from 'models/PaymentStatus';
import { EnumPaymentGateway } from './PaymentGateway';
import { RoutePointPriceType } from './Route';
import { SeatType, TicketDirection, TicketStatus, TicketType } from './TicketSale';

export interface PassengerOfReportTicketSale {
  firstName: string;
  lastName: string;
  typeTicket: RoutePointPriceType;
  seatsType: SeatType;
  price: number;
}

export interface ReportTicketSale {
  _id: string;
  orderCode: string;
  ticketCode: string;
  company: string;
  routePoint: string;
  routeCode: string;
  vehicle: string;
  departureTime: number;
  day: string;
  departurePoint: string;
  departurePointCode: string;
  arrivalPoint: string;
  arrivalPointCode: string;
  totalPrice: number;
  currency: string;
  totalPax: number;
  ECOseated: number;
  VIPseated: number;
  passengers: PassengerOfReportTicketSale;
  email: string;
  paymentStatus: EPaymentStatus;
  paymentType: EnumPaymentGateway;
  ticketType: TicketType;
  ticketDirection: TicketDirection;
  ticketStatus: TicketStatus;
  creator: string;
  creatorType: string;
  passengerPresent: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  payment: string;
}
