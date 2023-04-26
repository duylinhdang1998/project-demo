import { TicketSale } from 'services/models/TicketSale';

interface Trip {
  routePoint: TicketSale['routePoint'];
  dateFormatted: string;
  vehicle: TicketSale['vehicle'];
}

export interface LocationStateForCreateTicketSaleOneWay {
  type: 'ONE_WAY';
  data: Trip;
}

export interface LocationStateForCreateTicketSaleRoundTrip {
  type: 'ROUND_TRIP';
  data: {
    departureTrip: Trip;
    returnTrip: Trip;
  };
}

export type GeneralInfomationOfTicket = LocationStateForCreateTicketSaleOneWay | LocationStateForCreateTicketSaleRoundTrip;
