import { SubscriptionOrder } from 'services/models/Subscription';
import { CreateSubscriptionOrder } from 'services/Subscription/createSubscriptionOrder';

export interface CreateSubscriptionOrderRequest extends CreateSubscriptionOrder {}

export interface CreateSubscriptionOrderSuccess {
  data: SubscriptionOrder;
}

export interface CreateSubscriptionOrderFailure {}
