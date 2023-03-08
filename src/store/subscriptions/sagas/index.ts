import { watchCreateSubscriptionOrder } from './watchCreateSubscriptionOrder';
import { watchGetCurrentSubscription } from './watchGetCurrentSubscription';
import { watchGetPlans } from './watchGetPlans';
import { watchGetSubscriptions } from './watchGetSubscriptions';

export const subscriptionsSagas = [watchCreateSubscriptionOrder, watchGetCurrentSubscription, watchGetSubscriptions, watchGetPlans];
