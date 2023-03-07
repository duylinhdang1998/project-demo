import { CurrentSubscription } from 'services/models/Subscription';
import { getDaysLeftFromRangeDate } from 'utils/getDaysLeftFromRangeDate';

export const getTotalRemainingDays = (currentSubscription: CurrentSubscription) => {
  return getDaysLeftFromRangeDate(new Date(), new Date(currentSubscription.endDate));
};
