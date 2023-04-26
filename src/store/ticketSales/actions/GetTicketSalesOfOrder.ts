import { GetTicketSalesOfOrder } from 'services/TicketSale/getTicketSalesOfOrder';
import { TicketSalesState } from '../ticketSalesSlice';

export type GetTicketSalesOfOrderRequest = GetTicketSalesOfOrder;

export interface GetTicketSalesOfOrderSuccess {
  data: TicketSalesState['ticketSalesOfOrder'];
}

export interface GetTicketSalesOfOrderFailure {}
