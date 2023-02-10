import { AxiosResponse } from 'axios';
import { VehicleEvent } from 'services/models/Vehicle';
import { ServiceException } from 'services/utils/ServiceException';
import fetchAPI from 'utils/fetchAPI';

export interface UpdateVehicleEvent {
  id: VehicleEvent['_id'];
  data: Pick<VehicleEvent, 'attach' | 'description' | 'extraFees' | 'fuelFees' | 'reminderDate' | 'totalKilometers'>;
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

export const updateVehicleEvent = async ({ data, id }: UpdateVehicleEvent): Promise<ResponseSuccess> => {
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
