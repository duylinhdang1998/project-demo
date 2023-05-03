import { TicketSale } from 'services/models/TicketSale';
import { UpdatePaymentStatusOfOrder } from 'services/TicketSale/updatePaymentStatusOfOrder';

export interface UpdatePaymentStatusOfOrderRequest {
  data:
    | { type: 'ONE_TRIP'; data: UpdatePaymentStatusOfOrder }
    | {
        type: 'ROUND_TRIP';
        data: {
          departureTicket: UpdatePaymentStatusOfOrder;
          returnTicket: UpdatePaymentStatusOfOrder;
        };
      };
  orderCode: string;
  onSuccess: (orderCode: TicketSale['orderCode']) => void;
  onFailure: OnFailureWithMessageOfStatusCode;
}

export interface UpdatePaymentStatusOfOrderSuccess {}
export interface UpdatePaymentStatusOfOrderFailure {}
