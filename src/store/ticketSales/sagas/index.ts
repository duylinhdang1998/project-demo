import { watchCreateTicketSaleOneWay } from './watchCreateTicketSaleOneWay';
import { watchGetTicketSale } from './watchGetTicketSale';
import { watchGetTicketSales } from './watchGetTicketSales';
import { watchSendEmail } from './watchSendEmail';
import { watchTicketStatus } from './watchUpdateTicketStatus';

export const ticketSalesSagas = [watchGetTicketSales, watchGetTicketSale, watchCreateTicketSaleOneWay, watchSendEmail, watchTicketStatus];
