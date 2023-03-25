import { watchCreateTicketSale } from './watchCreateTicketSale';
import { watchGetTicketSale } from './watchGetTicketSale';
import { watchGetTicketSales } from './watchGetTicketSales';
import { watchSendEmail } from './watchSendEmail';

export const ticketSalesSagas = [watchGetTicketSales, watchGetTicketSale, watchCreateTicketSale, watchSendEmail];
