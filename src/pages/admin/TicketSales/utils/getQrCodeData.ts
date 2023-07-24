import { TicketSale } from 'services/models/TicketSale';

export const getQrCodeData = (ticketSale: TicketSale) => {
  return JSON.stringify({ orderCode: ticketSale.orderCode });
};
