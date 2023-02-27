import { useRequest } from 'ahooks';
import { Options } from 'ahooks/lib/useRequest/src/types';
import { AxiosResponse } from 'axios';
import fetchAPI from 'utils/fetchAPI';

interface SettingPayload {
  pendingPayment: number;
  startTrip: number;
}

interface OrderSettingResponse {
  code: number;
  data: SettingPayload;
}

export const useGetOrderSettings = () => {
  const getOrderSettings = async () => {
    const response: AxiosResponse<OrderSettingResponse> = await fetchAPI.request({
      url: '/v1.0/company/order-settings',
      method: 'get',
    });
    return response.data;
  };
  return useRequest(getOrderSettings);
};

export const useUpdateOrderSettings = (option: Options<OrderSettingResponse, any>) => {
  const updateOrderSettings = async (data: any) => {
    const response: AxiosResponse<OrderSettingResponse> = await fetchAPI.request({
      url: '/v1.0/company/order-settings',
      method: 'post',
      data,
    });
    return response.data;
  };
  return useRequest<OrderSettingResponse, [SettingPayload]>(updateOrderSettings, {
    manual: true,
    ...option,
  });
};
