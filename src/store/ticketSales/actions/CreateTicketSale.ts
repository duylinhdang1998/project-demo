import { TicketSale } from 'services/models/TicketSale';
import { CreateTicketSale } from 'services/TicketSale/createTicketSale';

export interface CreateTicketSaleRequest {
  data: CreateTicketSale;
  onSuccess: (ticketSaleId: TicketSale['_id']) => void;
  onFailure: () => void;
}

export interface CreateTicketSaleSuccess {
  data: TicketSale;
}

export interface CreateTicketSaleFailure {}
