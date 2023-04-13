import { SendEmail } from 'services/Passenger/sendEmail';

export interface SendEmailRequest {
  data: SendEmail;
  onSuccess: () => void;
  onFailure: OnFailureWithMessageOfStatusCode;
}

export interface SendEmailSuccess {}

export interface SendEmailFailure {}
