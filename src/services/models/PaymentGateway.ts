export type EnumPaymentGateway = 'PAYPAL' | 'STRIPE';

export interface PaymentGateway {
  _id?: string;
  company?: string;
  paymentGateWay?: string;
  __v?: number;
  createdAt?: Date;
  registered?: boolean;
  status?: boolean;
  updatedAt?: Date;
  accountId?: string;
}
