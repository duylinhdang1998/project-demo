import { AxiosResponse } from 'axios';
import { SubscriptionPlan, SubscriptionType } from 'services/models/Subscription';
import fetchAPI from 'utils/fetchAPI';

interface ResponseSuccess {
  code: 0;
  data: SubscriptionPlan[];
}

export interface GetPlans {
  subscriptionType: SubscriptionType;
}
export const getPlans = async ({ subscriptionType }: GetPlans) => {
  const response: AxiosResponse<ResponseSuccess> = await fetchAPI.request({
    url: `/v1.0/company/subscriptions/${subscriptionType}/plans`,
  });
  return response.data;
};
