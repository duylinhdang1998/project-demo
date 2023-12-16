import { useRequest } from 'ahooks';
import { Options } from 'ahooks/lib/useRequest/src/types';
import { AxiosResponse } from 'axios';
import { PaymentGateway } from 'services/models/PaymentGateway';
import fetchAPI from 'utils/fetchAPI';

interface SettingPayload {
  refreshUrl?: string;
  returnUrl?: string;
  redirectUrl?: string;
}

interface MethodUpdatePayload {
  data: {
    method?: string;
    status: boolean;
  }[];
}

export interface MethodPaymentResponse {
  code: number;
  data: PaymentGateway[];
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

export const useLoginPaymentGateway = () => {
  const loginPaymentGateway = async (url: string, data?: SettingPayload) => {
    const response: AxiosResponse<{ code: number; data: any }> = await fetchAPI.request({
      url,
      method: 'post',
      data,
    });
    return response.data.code === 0 ? response.data.data : undefined;
  };
  return useRequest(loginPaymentGateway, {
    manual: true,
  });
};

export const useUpdatePaymentSettings = (option: Options<MethodPaymentResponse, any>) => {
  const updateOrderSettings = async (data: MethodUpdatePayload) => {
    const response: AxiosResponse<MethodPaymentResponse> = await fetchAPI.request({
      url: '/v1.0/company/payment/settings',
      method: 'post',
      data: data.data,
    });
    return response.data;
  };
  return useRequest<MethodPaymentResponse, [MethodUpdatePayload]>(updateOrderSettings, {
    manual: true,
    ...option,
  });
};

export const useRegisterPaypal = () => {
  const registerPaypal = async (code: string) => {
    const response = await fetchAPI.request({
      url: '/v1.0/company/payment/paypal/register',
      method: 'post',
      data: {
        code,
      },
    });
    return response.data;
  };
  return useRequest<any, any>(registerPaypal, {
    manual: true,
  });
};
