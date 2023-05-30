import { AxiosResponse } from 'axios';
import { Office } from 'services/models/Office';
import { ResponseDetailSuccess, ResponseFailure } from 'services/models/Response';
import { ServiceException } from 'services/utils/ServiceException';
import { isResponseError } from 'services/utils/isResponseError';
import fetchAPI from 'utils/fetchAPI';

export type CreateOffice = Pick<Office, 'title' | 'address' | 'zipCode' | 'country' | 'city' | 'phone' | 'email'>;

export const createOffice = async (data: CreateOffice): Promise<ResponseDetailSuccess<Office>> => {
  const response: AxiosResponse<ResponseDetailSuccess<Office> | ResponseFailure> = await fetchAPI.request({
    method: 'POST',
    url: '/v1.0/company/office-manager',
    data,
  });

  if (isResponseError(response)) {
    throw new ServiceException(response.data.message, response.data);
  }
  return response.data as ResponseDetailSuccess<Office>;
};
