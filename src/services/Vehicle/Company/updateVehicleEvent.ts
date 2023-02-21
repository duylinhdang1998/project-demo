import { AxiosResponse } from 'axios';
import { ResponseDetailSuccess, ResponseFailure } from 'services/models/Response';
import { VehicleEvent } from 'services/models/Vehicle';
import { ServiceException } from 'services/utils/ServiceException';
import fetchAPI from 'utils/fetchAPI';
import { momentToNumber } from 'utils/momentToNumber';

export interface UpdateVehicleEvent {
  id: VehicleEvent['_id'];
  data: Pick<VehicleEvent, 'attach' | 'description' | 'extraFees' | 'fuelFees' | 'reminderDate' | 'totalKilometers' | 'vehicle'>;
}

interface ResponseData {
  acknowledged: boolean;
  modifiedCount: number;
  upsertedId: null;
  upsertedCount: number;
  matchedCount: number;
}

export const updateVehicleEvent = async ({ data, id }: UpdateVehicleEvent): Promise<ResponseDetailSuccess<ResponseData>> => {
  const response: AxiosResponse<ResponseDetailSuccess<ResponseData> | ResponseFailure> = await fetchAPI.request({
    method: 'PUT',
    url: `/v1.0/company/vehicle-events/${id}`,
    data: {
      ...data,
      reminderDate: momentToNumber(data.reminderDate),
      extraFees: Number(data.extraFees),
      fuelFees: Number(data.fuelFees),
      totalKilometers: Number(data.totalKilometers),
      attach: data.attach?._id,
    },
  });
  if (response.data.code === 0) {
    return response.data as ResponseDetailSuccess<ResponseData>;
  }
  const response_ = response as AxiosResponse<ResponseFailure>;
  throw new ServiceException(response_.data.message, { cause: response_.data });
};
