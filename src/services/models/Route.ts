import { Vehicle } from './Vehicle';

export type RouteType = 'MULTI_STOP' | 'ONE_TRIP';

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
  vehicle: Vehicle['_id'];
  departurePoint: string;
  departureTime: string;
  dayActives: string[]; // FIXME: Liệu có phải là ENUM
  startPeriod: null | string;
  endPeriod: null | string;
  stopPoints: [StopPoint] | StopPoint[];
  particularDays: [];
  dayoffs: number[];
  routeType: RouteType;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
