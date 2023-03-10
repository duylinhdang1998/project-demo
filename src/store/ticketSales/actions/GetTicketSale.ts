import { TicketSale } from 'services/models/TicketSale';
import { GetTicketSale } from 'services/TicketSale/getTicketSale';

export type GetTicketSaleRequest = GetTicketSale;

export interface GetTicketSaleSuccess {
  data: TicketSale;
}

export interface GetTicketSaleFailure {}
