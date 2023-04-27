import { PassengerInTicketSale, TicketSale } from 'services/models/TicketSale';

export interface ColumnTicket {
  _id: TicketSale['_id'];
  lastName: PassengerInTicketSale['lastName'];
  firstName: PassengerInTicketSale['firstName'];
  departurePoint: TicketSale['departurePoint'];
  arrivalPoint: TicketSale['arrivalPoint'];
  departureTime: TicketSale['departureTime'];
  totalPax: TicketSale['totalPax'];
  totalPrice: TicketSale['totalPrice'];
  paymentStatus: TicketSale['paymentStatus'];
  orderCode: TicketSale['orderCode'];
  createdBy: TicketSale['creator'];
  createdOn: TicketSale['createdAt'];
  ticketType: TicketSale['ticketType'];
  ticketStatus: TicketSale['ticketStatus'];
  // FIXME: BE chưa có field này
  cancelReason?: string;
  rawData: TicketSale;
}
