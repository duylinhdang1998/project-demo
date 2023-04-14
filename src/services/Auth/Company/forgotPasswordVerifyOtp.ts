import { AxiosResponse } from 'axios';
import { ResponseDetailSuccess, ResponseFailure } from 'services/models/Response';
import { ServiceException } from 'services/utils/ServiceException';
import fetchAPI from 'utils/fetchAPI';

interface ResponseData {
  session: string;
}

interface ForgotPasswordVerifyOtp {
  session: string;
  otp: string;
}

export const forgotPasswordVerifyOtp = async ({ otp, session }: ForgotPasswordVerifyOtp) => {
  const response: AxiosResponse<ResponseDetailSuccess<ResponseData> | ResponseFailure> = await fetchAPI.request({
    method: 'POST',
    url: '/v1.0/company/rbac/forgot-password/verify-otp',
    data: { otp, session },
  });

  if (response.data.code === 0) {
    return response.data as ResponseDetailSuccess<ResponseData>;
  }
  const response_ = response as AxiosResponse<ResponseFailure>;
  throw new ServiceException(response_.data.message, response_.data);
};
