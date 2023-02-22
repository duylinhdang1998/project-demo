import { AxiosResponse } from 'axios';
import { ResponseDetailSuccess } from 'services/models/Response';
import { Vehicle } from 'services/models/Vehicle';
import fetchAPI from 'utils/fetchAPI';

export interface GetVehicle {
  id: Vehicle['_id'];
}

export const getVehicle = async ({ id }: GetVehicle) => {
  const response: AxiosResponse<ResponseDetailSuccess<Vehicle>> = await fetchAPI.request({
    url: `/v1.0/company/vehicles/${id}/detail`,
  });
  return response.data;
};
