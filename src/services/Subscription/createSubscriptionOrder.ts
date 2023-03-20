import { AxiosResponse } from 'axios';
import { ResponseDetailSuccess, ResponseFailure } from 'services/models/Response';
import { SubscriptionOrder, SubscriptionPlan, SubscriptionType } from 'services/models/Subscription';
import { ServiceException } from 'services/utils/ServiceException';
import fetchAPI from 'utils/fetchAPI';

export type PaymentGateWay = 'PAYPAL' | 'STRIPE';

export interface CreateSubscriptionOrder {
  subscriptionType: SubscriptionType;
  period: SubscriptionPlan['months'];
  paymentGateWay: PaymentGateWay;
}
export const createSubscriptionOrder = async (data: CreateSubscriptionOrder) => {
  const response: AxiosResponse<ResponseDetailSuccess<SubscriptionOrder> | ResponseFailure> = await fetchAPI.request({
    method: 'POST',
    url: '/v1.0/company/subscriptions/order',
    data,
  });
  if (response.data.code === 0) {
    return response.data as ResponseDetailSuccess<SubscriptionOrder>;
  }
  const response_ = response as AxiosResponse<ResponseFailure>;
  throw new ServiceException(response_.data.message, { cause: response_.data });
};
