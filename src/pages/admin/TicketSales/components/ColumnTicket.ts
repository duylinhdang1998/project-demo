import { PassengerInTicketSale, TicketSale } from 'services/models/TicketSale';

export interface ColumnTicket {
  _id: string;
  lastName: PassengerInTicketSale['lastName'];
  firstName: PassengerInTicketSale['firstName'];
  departurePoint: TicketSale['departurePoint'];
  arrivalPoint: TicketSale['arrivalPoint'];
  departureTime: TicketSale['departureTime'];
  totalPax: number;
  paymentStatus: TicketSale['paymentStatus'];
  orderId: TicketSale['orderCode'];
  createdBy: TicketSale['creator'];
  createdOn: TicketSale['createdAt'];
  // FIXME: BE chưa có field này
  cancelReason?: string;
  rawData: TicketSale;
}
