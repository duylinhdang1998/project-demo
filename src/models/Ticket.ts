export interface Ticket {
  id: string;
  lastName?: string;
  firstName?: string;
  trip?: string[];
  dateTime?: Date;
  paxCount?: number;
  payment_status?: string;
  orderId?: string;
  createdBy?: string;
}
