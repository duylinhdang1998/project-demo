import { AxiosResponse } from 'axios';
import { VehicleEvent } from 'services/models/Vehicle';
import fetchAPI from 'utils/fetchAPI';

export interface GetVehicleEvent {
  id: VehicleEvent['_id'];
}

interface ResponseSuccess {
  code: number;
  data: VehicleEvent;
}

export const getVehicleEvent = async ({ id }: GetVehicleEvent) => {
  const response: AxiosResponse<ResponseSuccess> = await fetchAPI.request({
    url: `/v1.0/company/vehicle-events/${id}/detail`,
  });
  return response.data;
};
