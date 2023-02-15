import { AxiosResponse } from 'axios';
import { Vehicle } from 'services/models/Vehicle';
import { ServiceException } from 'services/utils/ServiceException';
import fetchAPI from 'utils/fetchAPI';

export type CreateVehicle = Pick<Vehicle, 'ECOseats' | 'VIPseats' | 'attach' | 'brand' | 'merchandises' | 'model' | 'registrationId' | 'services'>;

interface ResponseSuccess {
  code: number;
  data: Vehicle;
}

interface ResponseFailure {
  code: number;
  timestamp: string;
  path: string;
  message: string;
}

export const createVehicle = async (data: CreateVehicle): Promise<ResponseSuccess> => {
  const response: AxiosResponse<ResponseSuccess | ResponseFailure> = await fetchAPI.request({
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
    return response.data as ResponseSuccess;
  }
  const response_ = response as AxiosResponse<ResponseFailure>;
  throw new ServiceException(response_.data.message, { cause: response_.data });
};
