import { AxiosResponse } from 'axios';
import { ResponseDetailSuccess, ResponseFailure } from 'services/models/Response';
import { Staff } from 'services/models/Staff';
import { ServiceException } from 'services/utils/ServiceException';
import fetchAPI from 'utils/fetchAPI';

export type CreateStaff = Pick<Staff, 'attach' | 'office' | 'lastName' | 'firstName' | 'email' | 'phone' | 'role'>;

export const createStaff = async (data: CreateStaff) => {
  const response: AxiosResponse<ResponseDetailSuccess<Staff> | ResponseFailure> = await fetchAPI.request({
    method: 'POST',
    url: '/v1.0/company/staffs/information',
    data: {
      ...data,
      attach: data.attach._id,
      office: data.office._id,
    },
  });
  if (response.data.code === 0) {
    return response.data as ResponseDetailSuccess<Staff>;
  }
  const response_ = response as AxiosResponse<ResponseFailure>;
  throw new ServiceException(response_.data.message, { cause: response_.data });
};
