import { TicketSale } from 'services/models/TicketSale';
import { CreateTicketSaleOneTrip } from 'services/TicketSale/createTicketSaleOneTrip';
import { CreateTicketSaleRoundTrip } from 'services/TicketSale/createTicketSaleRoundTrip';

interface CreateOrderOneTripRequest {
  type: 'ONE_TRIP';
  data: CreateTicketSaleOneTrip;
}
interface CreateOrderRoundTripRequest {
  type: 'ROUND_TRIP';
  data: CreateTicketSaleRoundTrip;
}

export type CreateOrderRequest = (CreateOrderOneTripRequest | CreateOrderRoundTripRequest) & {
  onSuccess: (orderCode: TicketSale['orderCode']) => void;
  onFailure: OnFailureWithMessageOfStatusCode;
};

export interface CreateOrderSuccess {}

export interface CreateOrderFailure {}
