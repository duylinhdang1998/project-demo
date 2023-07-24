import { GetTicketSalesOfOrder } from 'services/TicketSale/getTicketSalesOfOrder';
import { TicketSalesState } from '../ticketSalesSlice';

export type GetTicketSalesOfOrderRequest = GetTicketSalesOfOrder & {
  onTicketNonExist?: () => void;
  onFailure?: (message: string) => void;
};

export interface GetTicketSalesOfOrderSuccess {
  data: TicketSalesState['ticketSalesOfOrder'];
}

export interface GetTicketSalesOfOrderFailure {}
