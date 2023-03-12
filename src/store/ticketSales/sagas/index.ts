import { watchCreateTicketSale } from './watchCreateTicketSale';
import { watchGetTicketSale } from './watchGetTicketSale';
import { watchGetTicketSales } from './watchGetTicketSales';

export const ticketSalesSagas = [watchGetTicketSales, watchGetTicketSale, watchCreateTicketSale];
