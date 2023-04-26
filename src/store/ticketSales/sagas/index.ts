import { watchCreateTicketSalesOfOrder } from './watchCreateTicketSalesOfOrder';
import { watchGetTicketSalesOfOrder } from './watchGetTicketSalesOfOrder';
import { watchGetTicketSales } from './watchGetTicketSales';
import { watchSendEmail } from './watchSendEmail';
import { watchOrderStatus } from './watchUpdateOrderStatus';

export const ticketSalesSagas = [watchGetTicketSales, watchGetTicketSalesOfOrder, watchCreateTicketSalesOfOrder, watchSendEmail, watchOrderStatus];
