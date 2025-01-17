import { EPaymentStatus } from 'models/PaymentStatus';
import { Passenger } from './Passenger';
import { EnumPaymentGateway } from './PaymentGateway';
import { Route, RoutePoint, RoutePointPriceType } from './Route';
import { UserRole } from './UserRole';
import { Vehicle } from './Vehicle';
import { TFunction } from 'i18next';

export type TicketStatus = 'USED' | 'PENDING' | 'CANCELLED';
export type TicketDirection = 'DEPARTURE' | 'RETURN';
export type TicketType = 'ROUND_TRIP' | 'ONE_TRIP';
export type SeatType = 'ECO' | 'VIP';

export interface PassengerInTicketSale {
  firstName: string;
  lastName: string;
  typeTicket: RoutePointPriceType;
  seatsType: SeatType;
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
  paymentStatus: EPaymentStatus;
  paymentType: EnumPaymentGateway;
  ticketType: TicketType;
  ticketDirection: TicketDirection;
  ticketStatus: TicketStatus;
  creator: string;
  creatorType: UserRole;
  passengerPresent?: Passenger['_id'];
  createdAt: string;
  updatedAt: string;
  cancelReason?: string;
  __v: 0;
  arrivalPointCode: string;
}

export interface RouteOfTicketSale {
  _id: Route['_id'];
  company: Route['company'];
  routeCode: Route['routeCode'];
  departurePoint: RoutePoint['departurePoint'];
  departurePointCode: RoutePoint['departurePointCode'];
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

export const getTicketTypeLabelMapping = (t: TFunction): Record<TicketType, string> => ({
  ROUND_TRIP: t('ticketSales:round_trip'),
  ONE_TRIP: t('ticketSales:oneway'),
});
