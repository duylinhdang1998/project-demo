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
  particularDays: Array<string | number>;
  routeCode: string;
  routePoints: [RoutePoint] | RoutePoint[];
  startPeriod: null | string | number;
  tripType: TripType;
  updatedAt: string;
  vehicle: Vehicle | null;
}
