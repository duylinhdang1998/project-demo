import { AxiosResponse } from 'axios';
import { Subscription } from 'services/models/Subscription';
import fetchAPI from 'utils/fetchAPI';

interface ResponseSuccess {
  code: 0;
  data: Subscription[];
}

export interface GetSubscriptions {}

export const getSubscriptions = async (_: GetSubscriptions) => {
  const response: AxiosResponse<ResponseSuccess> = await fetchAPI.request({
    url: '/v1.0/company/subscriptions',
  });
  return response.data;
};
