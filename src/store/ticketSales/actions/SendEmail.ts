import { SendEmail } from 'services/TicketSale/sendEmail';

export type SendEmailRequest = SendEmail & {
  onSuccess: () => void;
  onFailure: OnFailureWithMessageOfStatusCode;
};
export interface SendEmailSuccess {}
export interface SendEmailFailure {}
