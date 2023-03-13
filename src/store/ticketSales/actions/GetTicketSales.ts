import { TicketSale } from 'services/models/TicketSale';
import { GetTicketSales } from 'services/TicketSale/getTicketSales';

export type GetTicketSalesRequest = GetTicketSales & {};

export interface GetTicketSalesSuccess {
  data: TicketSale[];
  totalPages: number;
  totalRows: number;
  page: GetTicketSales['page'];
  searcher: GetTicketSales['searcher'];
}

export interface GetTicketSalesFailure {}
