import { watchGetPlans } from './watchGetPlans';
import { watchGetSubscriptions } from './watchGetSubscriptions';

export const subscriptionsSagas = [watchGetSubscriptions, watchGetPlans];
