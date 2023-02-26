import { AxiosResponse } from 'axios';
import { omit } from 'lodash';
import { Profile } from 'models/Profile';
import { ResponseDetailSuccess, ResponseFailure } from 'services/models/Response';
import { ServiceException } from 'services/utils/ServiceException';
import fetchAPI from 'utils/fetchAPI';

type ResponseData = true;

export type UpdateProfile = Pick<
  Profile,
  'email' | 'name' | 'address' | 'zipCode' | 'city' | 'country' | 'transportLicense' | 'profileImage' | 'logoImage'
> & {
  currency: string;
};
export const updateProfile = async (data: UpdateProfile) => {
  const response: AxiosResponse<ResponseDetailSuccess<ResponseData> | ResponseFailure> = await fetchAPI.request({
    method: 'put',
    url: '/v1.0/company',
    data: {
      ...omit(data, ['email']),
      profileImage: data.profileImage._id,
      logoImage: data.logoImage._id,
    },
  });

  if (response.data.code === 0) {
    return response.data as ResponseDetailSuccess<ResponseData>;
  }
  const response_ = response as AxiosResponse<ResponseFailure>;
  throw new ServiceException(response_.data.message, { cause: response_.data });
};
