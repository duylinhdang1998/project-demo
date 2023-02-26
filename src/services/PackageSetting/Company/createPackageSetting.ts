import { AxiosResponse } from 'axios';
import { PackageSetting } from 'services/models/PackageSetting';
import { ResponseDetailSuccess, ResponseFailure } from 'services/models/Response';
import { ServiceException } from 'services/utils/ServiceException';
import fetchAPI from 'utils/fetchAPI';

export type CreatePackageSetting = Pick<PackageSetting, 'title' | 'description'>;

export const createPackageSetting = async (data: CreatePackageSetting): Promise<ResponseDetailSuccess<PackageSetting>> => {
  const response: AxiosResponse<ResponseDetailSuccess<PackageSetting> | ResponseFailure> = await fetchAPI.request({
    method: 'POST',
    url: '/v1.0/company/package-setting',
    data,
  });
  if (response.data.code === 0) {
    return response.data as ResponseDetailSuccess<PackageSetting>;
  }
  const response_ = response as AxiosResponse<ResponseFailure>;
  throw new ServiceException(response_.data.message, { cause: response_.data });
};
