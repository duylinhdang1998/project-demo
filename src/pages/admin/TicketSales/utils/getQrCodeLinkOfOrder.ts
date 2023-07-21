import { UserInfo } from 'models/UserInfo';
import { TicketSale } from 'services/models/TicketSale';

export const getQrCodeLinkOfOrder = (role: UserInfo['role'], ticketSale: TicketSale) => {
  const isAgent = role === 'agent';
  return `${window.location.origin}/${isAgent ? 'agent' : 'admin'}/ticket-sales/${ticketSale.orderCode}`;
};
