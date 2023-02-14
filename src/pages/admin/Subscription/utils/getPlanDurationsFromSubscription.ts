import { Subscription, SubscriptionPlan } from 'services/models/Subscription';
import { PlanDuration } from '../@types/PlanDuration';

export const getPlanDurationsFromSubscription = (subscription: Subscription): Record<PlanDuration, SubscriptionPlan> => {
  return {
    monthly: subscription.plans.find(plan => plan.months === 1) as SubscriptionPlan,
    yearly: subscription.plans.find(plan => plan.months === 12) as SubscriptionPlan,
  };
};
