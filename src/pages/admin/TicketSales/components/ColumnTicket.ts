import { PassengerInTicketSale, TicketSale } from 'services/models/TicketSale';

export interface ColumnTicket {
  _id: string;
  lastName: PassengerInTicketSale['lastName'];
  firstName: PassengerInTicketSale['firstName'];
  departurePoint: TicketSale['departurePoint'];
  arrivalPoint: TicketSale['arrivalPoint'];
  dateTime: Date;
  totalPax: number;
  paymentStatus: TicketSale['paymentStatus'];
  orderId: TicketSale['orderCode'];
  createdBy: TicketSale['creator'];
  rawData: TicketSale;
}
