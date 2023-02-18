import { AxiosResponse } from 'axios';
import { Vehicle } from 'services/models/Vehicle';
import fetchAPI from 'utils/fetchAPI';

export interface GetVehicle {
  id: Vehicle['_id'];
}

interface ResponseSuccess {
  code: number;
  data: Vehicle;
}

export const getVehicle = async ({ id }: GetVehicle) => {
  const response: AxiosResponse<ResponseSuccess> = await fetchAPI.request({
    url: `/v1.0/company/vehicles/${id}/detail`,
  });
  return response.data;
};