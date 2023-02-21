import { AxiosResponse } from 'axios';
import { ResponseDetailSuccess, ResponseFailure } from 'services/models/Response';
import { Vehicle } from 'services/models/Vehicle';
import { ServiceException } from 'services/utils/ServiceException';
import fetchAPI from 'utils/fetchAPI';

export type CreateVehicle = Pick<Vehicle, 'ECOseats' | 'VIPseats' | 'attach' | 'brand' | 'merchandises' | 'model' | 'registrationId' | 'services'>;

export const createVehicle = async (data: CreateVehicle): Promise<ResponseDetailSuccess<Vehicle>> => {
  const response: AxiosResponse<ResponseDetailSuccess<Vehicle> | ResponseFailure> = await fetchAPI.request({
    method: 'POST',
    url: '/v1.0/company/vehicles',
    data: {
      ...data,
      ECOseats: Number(data.ECOseats),
      VIPseats: Number(data.VIPseats),
      attach: data.attach?._id,
    },
  });
  if (response.data.code === 0) {
    return response.data as ResponseDetailSuccess<Vehicle>;
  }
  const response_ = response as AxiosResponse<ResponseFailure>;
  throw new ServiceException(response_.data.message, { cause: response_.data });
};
