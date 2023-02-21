import { AxiosResponse } from 'axios';
import { ResponseDetailSuccess, ResponseFailure } from 'services/models/Response';
import { Vehicle } from 'services/models/Vehicle';
import { ServiceException } from 'services/utils/ServiceException';
import fetchAPI from 'utils/fetchAPI';

export interface UpdateVehicle {
  id: Vehicle['_id'];
  data: Pick<Vehicle, 'ECOseats' | 'VIPseats' | 'attach' | 'brand' | 'merchandises' | 'model' | 'registrationId' | 'services'>;
}

interface ResponseData {
  acknowledged: boolean;
  modifiedCount: number;
  upsertedId: null;
  upsertedCount: number;
  matchedCount: number;
}

export const updateVehicle = async ({ data, id }: UpdateVehicle): Promise<ResponseDetailSuccess<ResponseData>> => {
  const response: AxiosResponse<ResponseDetailSuccess<ResponseData> | ResponseFailure> = await fetchAPI.request({
    method: 'PUT',
    url: `/v1.0/company/vehicles/${id}`,
    data: {
      ...data,
      ECOseats: Number(data.ECOseats),
      VIPseats: Number(data.VIPseats),
      attach: data.attach?._id,
    },
  });
  if (response.data.code === 0) {
    return response.data as ResponseDetailSuccess<ResponseData>;
  }
  const response_ = response as AxiosResponse<ResponseFailure>;
  throw new ServiceException(response_.data.message, { cause: response_.data });
};
