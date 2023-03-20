import { PaymentGateWay } from 'services/Subscription/createSubscriptionOrder';
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

export const paymentGateWayMapping: Record<PaymentMethod, PaymentGateWay> = {
  PayPal: 'PAYPAL',
  Stripe: 'STRIPE',
};
