import { EPaymentStatus } from 'models/PaymentStatus';
import { PaymentGateway } from './PaymentGateway';

export const UNLIMITED = 10000000000;
export type SubscriptionType = 'TRIAL' | 'STANDARD' | 'PRO' | 'ENTERPRISE';
export type SubscriptionKey = 'VEHICLE' | 'STATISTIC' | 'REPORTING' | 'SUPPORTTING';
export interface SubscriptionFeature {
  name: 'Create 1 vehicle.';
  type: SubscriptionType;
  key: SubscriptionKey;
  value: number;
}

export interface SubscriptionPlan {
  planId: string;
  name: string;
  months: 1 | 12;
  plusMonths: number;
  price: number;
}

export interface Subscription {
  active: true;
  currency: string;
  monthlyPrice: number;
  name: string;
  plans: SubscriptionPlan[];
  populateChoice: boolean;
  priority: number;
  subscriptionFeatures: SubscriptionFeature[];
  subscriptionType: SubscriptionType;
}

export interface CurrentSubscription {
  _id: string;
  company: string;
  endDate: string;
  subscriptionType: SubscriptionType;
  startDate: string;
  updatedAt: string;
  paymentId: string;
}

export interface SubscriptionOrder {
  payment: {
    company: string;
    paymentCode: string;
    orderType: 'SUBCRIPTION';
    paymentGateWay: PaymentGateway;
    paymentStatus: EPaymentStatus;
    _id: string;
    createdAt: string;
    updatedAt: string;
    __v: 0;
  };
  paymentLink:
    | string
    | Array<{
        href: string;
        rel: 'self' | 'approve' | 'update' | 'capture';
        method: 'GET' | 'PATCH' | 'POST';
      }>;
}
