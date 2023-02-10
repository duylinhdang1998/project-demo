import { AxiosResponse } from 'axios';
import { Vehicle } from 'services/models/Vehicle';
import { ServiceException } from 'services/utils/ServiceException';
import fetchAPI from 'utils/fetchAPI';

export interface UpdateVehicle {
  id: Vehicle['_id'];
  data: Pick<Vehicle, 'ECOseats' | 'VIPseats' | 'attach' | 'brand' | 'merchandises' | 'model' | 'registrationId' | 'services'>;
}

interface ResponseSuccess {
  code: number;
  data: {
    acknowledged: boolean;
    modifiedCount: number;
    upsertedId: null;
    upsertedCount: number;
    matchedCount: number;
  };
}

interface ResponseFailure {
  code: number;
  timestamp: string;
  path: string;
  message: string;
}

export const updateVehicle = async ({ data, id }: UpdateVehicle): Promise<ResponseSuccess> => {
  const response: AxiosResponse<ResponseSuccess | ResponseFailure> = await fetchAPI.request({
    method: 'PUT',
    url: `/v1.0/company/vehicles/${id}`,
    data,
  });
  if (response.data.code === 0) {
    return response.data as ResponseSuccess;
  }
  const response_ = response as AxiosResponse<ResponseFailure>;
  throw new ServiceException(response_.data.message, { cause: response_.data });
};
