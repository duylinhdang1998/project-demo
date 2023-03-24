import { PaymentGateway } from 'services/models/PaymentGateway';
import { PaymentMethod } from './@types/PaymentMethod';
import { PlanDuration } from './@types/PlanDuration';

export const planDurations: PlanDuration[] = ['monthly', 'yearly'];
export const planDurationsValue: Record<PlanDuration, 1 | 12> = {
  monthly: 1,
  yearly: 12,
};
export const defaultPlanDuration: PlanDuration = 'monthly';

export const paymentMethods: PaymentMethod[] = ['PayPal', 'Stripe'];
export const defaultPaymentMethod: PaymentMethod = 'PayPal';

export const paymentGateWayMapping: Record<PaymentMethod, PaymentGateway> = {
  PayPal: 'PAYPAL',
  Stripe: 'STRIPE',
};
