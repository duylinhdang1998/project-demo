import { get } from 'lodash-es';
import { TicketSale } from 'services/models/TicketSale';
import { ColumnTicket } from '../components/ColumnTicket';

type Passenger = TicketSale['passengers'][number];
export const ticketSaleModelToColumnTicket = (ticketSale: TicketSale, passenger?: Passenger): ColumnTicket => {
  const passenger_: Passenger | undefined = passenger ?? get(ticketSale.passengers, 0);
  return {
    _id: ticketSale._id,
    arrivalPoint: ticketSale.arrivalPoint,
    departurePoint: ticketSale.departurePoint,
    createdBy: ticketSale.creator,
    departureTime: ticketSale.departureTime,
    firstName: passenger_?.firstName ?? '',
    lastName: passenger_?.lastName ?? '',
    orderId: ticketSale.orderCode,
    paymentStatus: ticketSale.paymentStatus,
    totalPax: ticketSale.totalPax,
    createdOn: ticketSale.createdAt,
    // FIXME: BE chưa có field này
    cancelReason: 'Change other trip',
    rawData: ticketSale,
  };
};
