import { PaymentStatus } from 'models/PaymentStatus';
import { PaymentGateway } from './PaymentGateway';
import { UserRole } from './UserRole';
import { Route, RoutePoint, RoutePointPriceType } from './Route';

export interface PassengerInTicketSale {
  firstName: string;
  lastName: string;
  typeTicket: RoutePointPriceType;
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

export interface RouteOfTicketSale {
  _id: Route['_id'];
  company: Route['company'];
  routeCode: Route['routeCode'];
  departurePoint: RoutePoint['departurePoint'];
  stopPoint: RoutePoint['stopPoint'];
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
}
