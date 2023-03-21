import { SendEmail } from 'services/Passenger/sendEmail';

export interface SendEmailRequest {
  data: SendEmail;
  onSuccess: () => void;
  onFailure: () => void;
}

export interface SendEmailSuccess {}

export interface SendEmailFailure {}
