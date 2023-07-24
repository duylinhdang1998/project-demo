import { UserInfo } from 'models/UserInfo';

// return `${window.location.origin}/${isAgent ? 'agent' : 'admin'}/ticket-sales/${ticketSale.orderCode}`;
// "{\"orderCode\":\"915320500\"}"
export const getOrderCodeFromScanQr = (role: UserInfo['role'], data: string) => {
  try {
    const json = JSON.parse(data);
    return json.orderCode;
  } catch {
    const isAgent = role === 'agent';
    return data.replace(`${window.location.origin}/${isAgent ? 'agent' : 'admin'}/ticket-sales/`, '');
  }
};
