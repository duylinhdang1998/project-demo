import { AxiosResponse } from 'axios';
import { ResponseDetailSuccess } from 'services/models/Response';
import { CurrentSubscription } from 'services/models/Subscription';
import fetchAPI from 'utils/fetchAPI';

export interface GetCurrentSubscription {}
export const getCurrentSubscription = async (_: GetCurrentSubscription) => {
  const response: AxiosResponse<ResponseDetailSuccess<CurrentSubscription>> = await fetchAPI.request({
    url: `/v1.0/company/subscriptions/registed`,
  });
  return response.data;
};
