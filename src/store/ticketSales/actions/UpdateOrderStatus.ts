import { TicketSale } from 'services/models/TicketSale';
import { UpdateOrderStatus } from 'services/TicketSale/updateOrderStatus';

export interface UpdateOrderStatusRequest extends UpdateOrderStatus {
  targetTicket: TicketSale;
  onSuccess: () => void;
  onFailure: OnFailureWithMessageOfStatusCode;
}
export interface UpdateOrderStatusSuccess {
  data: TicketSale;
}
export interface UpdateOrderStatusFailure {
  id: TicketSale['_id'];
}
