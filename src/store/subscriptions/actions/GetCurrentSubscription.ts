import { CurrentSubscription } from 'services/models/Subscription';
import { GetCurrentSubscription } from 'services/Subscription/getCurrentSubscription';

export interface GetCurrentSubscriptionRequest extends GetCurrentSubscription {}

export interface GetCurrentSubscriptionSuccess {
  data: CurrentSubscription;
}

export interface GetCurrentSubscriptionFailure {}
