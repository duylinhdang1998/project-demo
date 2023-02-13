import { Subscription } from 'services/models/Subscription';
import { GetSubscriptions } from 'services/Subscription/getSubscriptions';

export interface GetSubscriptionsRequest extends GetSubscriptions {}

export interface GetSubscriptionsSuccess {
  data: Subscription[];
}

export interface GetSubscriptionsFailure {}
