import { SubscriptionPlan } from 'services/models/Subscription';
import { PlanDuration } from '../@types/PlanDuration';

export const getPlanDurationsFromSubscriptionPlans = (plans: SubscriptionPlan[]): Record<PlanDuration, SubscriptionPlan> => {
  return {
    monthly: plans.find((plan) => plan.months === 1) as SubscriptionPlan,
    yearly: plans.find((plan) => plan.months === 12) as SubscriptionPlan,
  };
};
