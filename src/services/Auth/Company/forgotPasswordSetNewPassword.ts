import { AxiosResponse } from 'axios';
import { ResponseDetailSuccess, ResponseFailure } from 'services/models/Response';
import { ServiceException } from 'services/utils/ServiceException';
import { isResponseError } from 'services/utils/isResponseError';
import fetchAPI from 'utils/fetchAPI';

interface ResponseData {
  company: '63d8d5e3b4c7b31bf36765c2';
  email: 'test02@gmail.com';
}

interface ForgotPasswordSetNewPassword {
  session: string;
  password: string;
}

export const forgotPasswordSetNewPassword = async ({ password, session }: ForgotPasswordSetNewPassword) => {
  const response: AxiosResponse<ResponseDetailSuccess<ResponseData> | ResponseFailure> = await fetchAPI.request({
    method: 'POST',
    url: '/v1.0/company/rbac/forgot-password',
    data: { password, session },
  });

  if (isResponseError(response)) {
    throw new ServiceException(response.data.message, response.data);
  }
  return response.data as ResponseDetailSuccess<ResponseData>;
};
