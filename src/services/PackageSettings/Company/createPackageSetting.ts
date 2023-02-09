import { AxiosResponse } from 'axios';
import { PackageSetting } from 'services/models/PackageSetting';
import { ServiceException } from 'services/utils/ServiceException';
import fetchAPI from 'utils/fetchAPI';

export type CreatePackageSetting = Pick<PackageSetting, 'title' | 'description'>;

interface ResponseSuccess {
  code: number;
  data: PackageSetting;
}

interface ResponseFailure {
  code: 1000;
  timestamp: '2023-02-07T13:24:03.044Z';
  path: '/v1.0/company/package-setting';
  message: 'An error occurred';
}

export const createPackageSetting = async (data: CreatePackageSetting): Promise<ResponseSuccess> => {
  const response: AxiosResponse<ResponseSuccess | ResponseFailure> = await fetchAPI.request({
    method: 'POST',
    url: '/v1.0/company/package-setting',
    data,
  });
  if (response.data.code === 0) {
    return response.data;
  }
  const response_ = response as AxiosResponse<ResponseFailure>;
  throw new ServiceException(response_.data.message, { cause: response_.data });
};
