export type SubscriptionType = 'TRIAL' | 'STANDARD' | 'PRO' | 'ENTERPRISE';

export interface SubscriptionFeature {
  name: 'Create 1 vehicle.';
  type: SubscriptionType;
}

export interface SubscriptionPlan {
  planId: string;
  name: string;
  months: number;
  plusMonths: number;
  price: number;
}

export interface Subscription {
  subscriptionType: SubscriptionType;
  name: string;
  active: true;
  currency: string;
  monthlyPrice: number;
  subscriptionFeatures: SubscriptionFeature[];
  plans: SubscriptionPlan[];
}
