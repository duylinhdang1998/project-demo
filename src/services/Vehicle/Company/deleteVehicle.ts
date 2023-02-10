import { AxiosResponse } from 'axios';
import { Vehicle } from 'services/models/Vehicle';
import fetchAPI from 'utils/fetchAPI';

export interface DeleteVehicle {
  id: Vehicle['_id'];
}

interface ResponseSuccess {
  code: number;
  data: {
    acknowledged: true;
    deletedCount: 1;
  };
}

export const deleteVehicle = async ({ id }: DeleteVehicle): Promise<ResponseSuccess> => {
  const response: AxiosResponse<ResponseSuccess> = await fetchAPI.request({
    method: 'DELETE',
    url: `/v1.0/company/vehicles/${id}`,
  });
  return response.data;
};
