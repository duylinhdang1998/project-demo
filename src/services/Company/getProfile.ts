import { AxiosResponse } from 'axios';
import { Profile } from 'models/Profile';
import { ResponseDetailSuccess, ResponseFailure } from 'services/models/Response';
import { ServiceException } from 'services/utils/ServiceException';
import fetchAPI from 'utils/fetchAPI';

export interface GetProfile {
  token?: string;
}
export const getProfile = async ({ token }: GetProfile) => {
  const response: AxiosResponse<ResponseDetailSuccess<Profile> | ResponseFailure> = await fetchAPI.request({
    url: '/v1.0/company/profile',
    headers: token ? { Authorization: token } : {},
  });

  if (response.data.code === 0) {
    return response.data as ResponseDetailSuccess<Profile>;
  }
  const response_ = response as AxiosResponse<ResponseFailure>;
  throw new ServiceException(response_.data.message, { cause: response_.data });
};
