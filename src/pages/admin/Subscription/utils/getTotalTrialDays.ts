import { CurrentSubscription } from 'services/models/Subscription';
import { getDaysLeftFromRangeDate } from 'utils/getDaysLeftFromRangeDate';

export const getTotalTrialDays = (currentSubscription: CurrentSubscription) => {
  return getDaysLeftFromRangeDate(new Date(currentSubscription.startDate), new Date(currentSubscription.endDate));
};
