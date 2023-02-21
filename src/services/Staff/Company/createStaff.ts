import { AxiosResponse } from 'axios';
import { ImageResource } from 'services/models/Resource';
import { ResponseDetailSuccess, ResponseFailure } from 'services/models/Response';
import { Staff } from 'services/models/Staff';
import { ServiceException } from 'services/utils/ServiceException';
import fetchAPI from 'utils/fetchAPI';

export type CreateStaff = Pick<Staff, 'office' | 'lastName' | 'firstName' | 'email' | 'phone' | 'role'> & {
  attach: ImageResource['_id'];
};

export const createStaff = async (data: CreateStaff) => {
  const response: AxiosResponse<ResponseDetailSuccess<Staff> | ResponseFailure> = await fetchAPI.request({
    method: 'POST',
    url: '/v1.0/company/staffs/information',
    data,
  });
  if (response.data.code === 0) {
    return response.data as ResponseDetailSuccess<Staff>;
  }
  const response_ = response as AxiosResponse<ResponseFailure>;
  throw new ServiceException(response_.data.message, { cause: response_.data });
};
