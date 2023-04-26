import { TicketSale } from 'services/models/TicketSale';
import { CreateTicketSaleOneWay } from 'services/TicketSale/createTicketSaleOneWay';

export interface CreateTicketSaleOneWayRequest {
  data: CreateTicketSaleOneWay;
  onSuccess: (ticketCode: TicketSale['ticketCode']) => void;
  onFailure: OnFailureWithMessageOfStatusCode;
}

export interface CreateTicketSaleOneWaySuccess {
  data: TicketSale;
}

export interface CreateTicketSaleOneWayFailure {}
