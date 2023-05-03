import { watchCreateTicketSalesOfOrder } from './watchCreateTicketSalesOfOrder';
import { watchGetTicketSalesOfOrder } from './watchGetTicketSalesOfOrder';
import { watchGetTicketSales } from './watchGetTicketSales';
import { watchSendEmail } from './watchSendEmail';
import { watchOrderStatus } from './watchUpdateOrderStatus';
import { watchUpdatePaymentStatusOfOrder } from './watchUpdatePaymentStatusOfOrder';

export const ticketSalesSagas = [
  watchGetTicketSales,
  watchGetTicketSalesOfOrder,
  watchCreateTicketSalesOfOrder,
  watchSendEmail,
  watchOrderStatus,
  watchUpdatePaymentStatusOfOrder,
];
