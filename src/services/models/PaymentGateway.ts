<<<<<<< HEAD
export type EnumPaymentGateway = 'PAYPAL' | 'STRIPE';

=======
>>>>>>> 14d847fa1f1500bca7fcc3b5cdaff0ac0fc372bc
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
