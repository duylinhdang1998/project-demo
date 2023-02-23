import { AxiosResponse } from 'axios';
import { ResponseDetailSuccess } from 'services/models/Response';
import { VehicleEvent } from 'services/models/Vehicle';
import fetchAPI from 'utils/fetchAPI';

export interface GetVehicleEvent {
  id: VehicleEvent['_id'];
}

export const getVehicleEvent = async ({ id }: GetVehicleEvent) => {
  const response: AxiosResponse<ResponseDetailSuccess<VehicleEvent>> = await fetchAPI.request({
    url: `/v1.0/company/vehicle-events/${id}/detail`,
  });
  return response.data;
};
