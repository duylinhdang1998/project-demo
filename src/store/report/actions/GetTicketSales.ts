import { ReportTicketSale } from 'services/models/ReportTicketSale';
import { GetTicketSales } from 'services/TicketSale/getTicketSales';

export type GetTicketSalesRequest = GetTicketSales & {};

export interface GetTicketSalesSuccess {
  data: ReportTicketSale[];
  totalPages: number;
  totalRows: number;
  page: GetTicketSales['page'];
  searcher: GetTicketSales['searcher'];
  totalPrices: number;
  totalTickets: number;
}

export interface GetTicketSalesFailure {}
