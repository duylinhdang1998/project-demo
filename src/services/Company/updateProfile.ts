import { AxiosResponse } from 'axios';
import { Profile } from 'models/Profile';
import { ResponseDetailSuccess, ResponseFailure } from 'services/models/Response';
import { ServiceException } from 'services/utils/ServiceException';
import { isResponseError } from 'services/utils/isResponseError';
import fetchAPI from 'utils/fetchAPI';

type ResponseData = true;

export type UpdateProfile = Pick<
  Profile,
  'name' | 'address' | 'zipCode' | 'city' | 'country' | 'transportLicense' | 'profileImage' | 'logoImage' | 'phone'
>;

export const updateProfile = async (data: UpdateProfile) => {
  const response: AxiosResponse<ResponseDetailSuccess<ResponseData> | ResponseFailure> = await fetchAPI.request({
    method: 'put',
    url: '/v1.0/company',
    data: {
      ...data,
      profileImage: data.profileImage._id,
      logoImage: data.logoImage._id,
    },
  });

  if (isResponseError(response)) {
    throw new ServiceException(response.data.message, response.data);
  }
  return response.data as ResponseDetailSuccess<ResponseData>;
};
