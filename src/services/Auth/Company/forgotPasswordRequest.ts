import { AxiosResponse } from 'axios';
import { ResponseDetailSuccess, ResponseFailure } from 'services/models/Response';
import { ServiceException } from 'services/utils/ServiceException';
import { isResponseError } from 'services/utils/isResponseError';
import fetchAPI from 'utils/fetchAPI';

interface ResponseData {
  session: string;
}

interface ForgotPasswordRequest {
  email: string;
}

export const forgotPasswordRequest = async ({ email }: ForgotPasswordRequest) => {
  const response: AxiosResponse<ResponseDetailSuccess<ResponseData> | ResponseFailure> = await fetchAPI.request({
    method: 'POST',
    url: '/v1.0/company/rbac/forgot-password/request',
    data: {
      email,
    },
  });

  if (isResponseError(response)) {
    throw new ServiceException(response.data.message, response.data);
  }
  return response.data as ResponseDetailSuccess<ResponseData>;
};
