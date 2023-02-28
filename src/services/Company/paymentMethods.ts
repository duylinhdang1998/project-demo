import { useRequest } from 'ahooks';
import { Options } from 'ahooks/lib/useRequest/src/types';
import { AxiosResponse } from 'axios';
import fetchAPI from 'utils/fetchAPI';

interface MethodPayload {
  method: string[];
}

interface MethodPaymentResponse {
  code: number;
  data: MethodPayload;
}

export const useGetPaymentMethod = () => {
  const getPaymentMethod = async () => {
    const response: AxiosResponse<MethodPaymentResponse> = await fetchAPI.request({
      url: '/v1.0/company/payment/settings',
      method: 'get',
    });
    return response.data;
  };
  return useRequest(getPaymentMethod);
};

export const useUpdateOrderSettings = (option: Options<MethodPaymentResponse, any>) => {
  const updateOrderSettings = async (data: any) => {
    const response: AxiosResponse<MethodPaymentResponse> = await fetchAPI.request({
      url: '/v1.0/company/payment/settings',
      method: 'post',
      data,
    });
    return response.data;
  };
  return useRequest<MethodPaymentResponse, [MethodPayload]>(updateOrderSettings, {
    manual: true,
    ...option,
  });
};