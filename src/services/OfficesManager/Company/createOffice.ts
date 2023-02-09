import { AxiosResponse } from 'axios';
import { Office } from 'services/models/Office';
import { ServiceException } from 'services/utils/ServiceException';
import fetchAPI from 'utils/fetchAPI';

export type CreateOffice = Pick<Office, 'title' | 'address' | 'zipCode' | 'country' | 'city' | 'phone' | 'email'>;

interface ResponseSuccess {
  code: number;
  data: Office;
}

interface ResponseFailure {
  code: 1000;
  timestamp: '2023-02-07T13:24:03.044Z';
  path: '/v1.0/company/office-manager';
  message: 'An error occurred';
}

export const createOffice = async (data: CreateOffice): Promise<ResponseSuccess> => {
  const response: AxiosResponse<ResponseSuccess | ResponseFailure> = await fetchAPI.request({
    method: 'POST',
    url: '/v1.0/company/office-manager',
    data,
  });
  if (response.data.code === 0) {
    return response.data;
  }
  const response_ = response as AxiosResponse<ResponseFailure>;
  throw new ServiceException(response_.data.message, { cause: response_.data });
};
