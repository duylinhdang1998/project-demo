import { PaymentStatus } from 'models/PaymentStatus';
import { Passenger } from './Passenger';
import { EnumPaymentGateway } from './PaymentGateway';
import { Route, RoutePoint, RoutePointPriceType } from './Route';
import { UserRole } from './UserRole';
import { Vehicle } from './Vehicle';

export type TicketStatus = 'USED' | 'PENDING' | 'CANCELLED';
export type TicketDirection = 'DEPARTURE' | 'RETURN';
export type TicketType = 'ROUND_TRIP' | 'ONE_TRIP';

export interface PassengerInTicketSale {
  firstName: string;
  lastName: string;
  typeTicket: RoutePointPriceType;
  seatsType: 'ECO' | 'VIP';
  price?: number;
}

export interface TicketSale {
  _id: string;
  orderCode: string;
  ticketCode: string;
  company: string;
  routePoint?: Omit<RoutePoint, 'vehicle'> & { vehicle: Vehicle['_id'] };
  routeCode: string;
  vehicle?: Vehicle;
  departureTime: number;
  day: string;
  departurePoint: RouteOfTicketSale['departurePoint'];
  arrivalPoint: RouteOfTicketSale['stopPoint'];
  totalPrice: number;
  totalPax: number;
  ECOseated: number;
  VIPseated: number;
  passengers: PassengerInTicketSale[];
  email: string;
  paymentStatus: PaymentStatus;
  paymentType: EnumPaymentGateway;
  ticketType: TicketType;
  ticketDirection: TicketDirection;
  ticketStatus: TicketStatus;
  creator: string;
  creatorType: UserRole;
  passengerPresent?: Passenger['_id'];
  createdAt: string;
  updatedAt: string;
  __v: 0;
}

export interface RouteOfTicketSale {
  _id: Route['_id'];
  company: Route['company'];
  routeCode: Route['routeCode'];
  departurePoint: RoutePoint['departurePoint'];
  stopPoint: RoutePoint['stopPoint'];
  stopPointCode: RoutePoint['stopPointCode'];
  durationTime: RoutePoint['durationTime'];
  preDurationTime: RoutePoint['durationTime'];
  vehicle: Route['vehicle'];
  ECOPrices: RoutePoint['ECOPrices'];
  VIPPrices: RoutePoint['ECOPrices'];
  isChanged: RoutePoint['isChanged'];
  routeType: RoutePoint['routeType'];
  tripType: Route['tripType'];
  createdAt: Route['createdAt'];
  updatedAt: Route['updatedAt'];
  __v: Route['__v'];
  route: {
    _id: '641974f046a8aea3e144b9db';
    company: '63d8d5e3b4c7b31bf36765c2';
    routeCode: '06977786';
    departureTime: '06:00';
    departurePoint: 'Hà Nam';
    vehicle: '63d9ecc5e5b2e2fcddb9394e';
    dayActives: [];
    startPeriod: null;
    endPeriod: null;
    particularDays: [];
    dayoffs: [];
    tripType: 'MULTI_STOP';
    createdAt: '2023-03-21T09:12:16.642Z';
    updatedAt: '2023-03-21T09:12:16.642Z';
    __v: 0;
  };
  dateQuery?: string;
  bookDate?: string;
}

export const TicketTypeLabelMapping: Record<TicketType, string> = {
  ROUND_TRIP: 'Round-trip',
  ONE_TRIP: 'One-way',
};
