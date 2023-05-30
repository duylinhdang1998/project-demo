import { AxiosResponse } from 'axios';
import { Profile } from 'models/Profile';
import { ResponseDetailSuccess, ResponseFailure } from 'services/models/Response';
import { ServiceException } from 'services/utils/ServiceException';
import { isResponseError } from 'services/utils/isResponseError';
import fetchAPI from 'utils/fetchAPI';

export interface GetProfile {
  url: string;
}
export const getProfile = async ({ url }: GetProfile) => {
  const response: AxiosResponse<ResponseDetailSuccess<Profile> | ResponseFailure> = await fetchAPI.request({
    url,
  });

  if (isResponseError(response)) {
    throw new ServiceException(response.data.message, response.data);
  }
  return response.data as ResponseDetailSuccess<Profile>;
};
