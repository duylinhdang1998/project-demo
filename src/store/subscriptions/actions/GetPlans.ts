import { SubscriptionPlan } from 'services/models/Subscription';
import { GetPlans } from 'services/Subscription/getPlans';

export interface GetPlansRequest extends GetPlans {}

export interface GetPlansSuccess {
  data: SubscriptionPlan[];
}

export interface GetPlansFailure {}
