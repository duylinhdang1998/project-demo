import { UserInfo } from 'models/UserInfo';

// return `${window.location.origin}/${isAgent ? 'agent' : 'admin'}/ticket-sales/${ticketSale.orderCode}`;
export const getOrderCodeFromScanQr = (role: UserInfo['role'], link: string) => {
  const isAgent = role === 'agent';
  return link.replace(`${window.location.origin}/${isAgent ? 'agent' : 'admin'}/ticket-sales/`, '');
};
