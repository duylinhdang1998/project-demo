import { get } from 'lodash-es';
import { TicketSale } from 'services/models/TicketSale';
import { ColumnTicket } from '../components/ColumnTicket';

type Passenger = TicketSale['passengers'][number];
export const ticketSaleModelToColumnTicket = (ticketSale: TicketSale, passenger?: Passenger): ColumnTicket => {
  const passenger_: Passenger | undefined = passenger ?? get(ticketSale.passengers, 0);
  return {
    _id: ticketSale._id,
    arrivalPoint: ticketSale.arrivalPoint,
    cancelReason: ticketSale.cancelReason,
    createdBy: ticketSale.creator,
    createdOn: ticketSale.createdAt,
    departurePoint: ticketSale.departurePoint,
    departureTime: ticketSale.departureTime,
    firstName: passenger_?.firstName ?? '',
    lastName: passenger_?.lastName ?? '',
    orderCode: ticketSale.orderCode,
    paymentStatus: ticketSale.paymentStatus,
    totalPax: ticketSale.totalPax,
    totalPrice: ticketSale.totalPrice,
    ticketType: ticketSale.ticketType,
    ticketStatus: ticketSale.ticketStatus,
    rawData: ticketSale,
  };
};
