import { DayInWeek } from './DayInWeek';
import { Vehicle } from './Vehicle';

export type TripType = 'MULTI_STOP' | 'ONE_TRIP';

export type RouteType = 'MAIN_ROUTE' | 'SUB_ROUTE';

export type RoutePointPriceType = 'ADULT' | 'STUDENT' | 'CHILD';

export type RoutePointPrice = Record<RoutePointPriceType, number>;

export interface RoutePoint {
  ECOPrices: RoutePointPrice | null;
  VIPPrices: RoutePointPrice | null;
  company: string;
  createdAt: string;
  departurePoint: string;
  durationTime: number;
  isChanged: boolean;
  routeCode: string;
  routeType: RouteType;
  stopPoint: string;
  stopPointCode: string;
  tripType: TripType;
  updatedAt: string;
  vehicle: Vehicle | null;
  __v: number;
  _id: string;
}

export interface Route {
  __v: number;
  _id: string;
  company: string;
  createdAt: string;
  dayActives: Array<DayInWeek>;
  dayoffs: number[];
  departurePoint: string;
  departureTime: string;
  endPeriod: null | string | number;
  particularDays: Array<number>;
  particularPrices: ParticularPrice[];
  routeCode: string;
  routePoints: [RoutePoint] | RoutePoint[];
  startPeriod: null | string | number;
  tripType: TripType;
  status: 'ACTIVE' | 'INACTIVE';
  updatedAt: string;
  vehicle: Vehicle | null;
}

export interface ParticularPrice {
  _id: string;
  routeCode: Route['routeCode'];
  routePoint: RoutePoint['_id'];
  ECOPrices: RoutePointPrice;
  VIPPrices: RoutePointPrice;
  __v: 0;
  applyDay: string;
  createdAt: string;
  updatedAt: string;
}
