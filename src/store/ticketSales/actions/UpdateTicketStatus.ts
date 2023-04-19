import { TicketSale } from 'services/models/TicketSale';
import { UpdateTicketStatus } from 'services/TicketSale/updateTicketStatus';

export interface UpdateTicketStatusRequest extends UpdateTicketStatus {
  targetTicket: TicketSale;
  onSuccess: () => void;
  onFailure: OnFailureWithMessageOfStatusCode;
}
export interface UpdateTicketStatusSuccess {
  data: TicketSale;
}
export interface UpdateTicketStatusFailure {
  id: TicketSale['_id'];
}
