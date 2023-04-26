import { TicketSale } from 'services/models/TicketSale';

interface Trip {
  routePoint: Required<TicketSale>['routePoint'];
  dateFormatted: string;
  vehicle: TicketSale['vehicle'];
}

export interface LocationStateForCreateOrderOneTrip {
  type: 'ONE_TRIP';
  data: Trip;
}

export interface LocationStateForCreateOrderRoundTrip {
  type: 'ROUND_TRIP';
  data: {
    departureTrip: Trip;
    returnTrip: Trip;
  };
}

export type GeneralInfomationOfOrder = LocationStateForCreateOrderOneTrip | LocationStateForCreateOrderRoundTrip;
