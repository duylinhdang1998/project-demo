import { TicketSale } from 'services/models/TicketSale';
import { CreateTicketSale } from 'services/TicketSale/createTicketSale';

export interface CreateTicketSaleRequest {
  data: CreateTicketSale;
  onSuccess: () => void;
  onFailure: () => void;
}

export interface CreateTicketSaleSuccess {
  data: TicketSale;
}

export interface CreateTicketSaleFailure {}
