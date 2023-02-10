import { AxiosResponse } from 'axios';
import { VehicleEvent } from 'services/models/Vehicle';
import fetchAPI from 'utils/fetchAPI';

export interface DeleteVehicleEvent {
  id: VehicleEvent['_id'];
}

interface ResponseSuccess {
  code: number;
  data: {
    acknowledged: true;
    deletedCount: 1;
  };
}

export const deleteVehicleEvent = async ({ id }: DeleteVehicleEvent): Promise<ResponseSuccess> => {
  const response: AxiosResponse<ResponseSuccess> = await fetchAPI.request({
    method: 'DELETE',
    url: `/v1.0/company/vehicle-events/${id}`,
  });
  return response.data;
};
