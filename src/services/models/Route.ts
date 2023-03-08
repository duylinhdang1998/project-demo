import { DayInWeek } from './DayInWeek';
import { Vehicle } from './Vehicle';

export type TripType = 'MULTI_STOP' | 'ONE_TRIP';

export interface StopPointPrice {
  ADULT: number;
  STUDENT: number;
  CHILD: number;
}

export interface StopPoint {
  stopPoint: string;
  stopCode: string;
  durationTime: number;
  ECOPrices: StopPointPrice;
  VIPPrices: StopPointPrice;
  createdAt: string;
  updatedAt: string;
}

export interface Route {
  _id: string;
  company: string;
  routeCode: string;
  vehicle: Vehicle;
  departurePoint: string;
  departureTime: string;
  // FIXME: Tách type enum
  dayActives: Array<DayInWeek>;
  startPeriod: null | string | number;
  endPeriod: null | string | number;
  stopPoints: [StopPoint] | StopPoint[];
  particularDays: Array<string | number>;
  dayoffs: number[];
  tripType: TripType;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
