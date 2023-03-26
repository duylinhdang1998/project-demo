import { SendEmail } from 'services/TicketSale/sendEmail';

export type SendEmailRequest = SendEmail & {
  onSuccess: () => void;
  onFailure: () => void;
};
export interface SendEmailSuccess {}
export interface SendEmailFailure {}
