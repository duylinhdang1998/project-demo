import { AxiosResponse } from 'axios';
import { isMoment } from 'moment';
import { VehicleEvent } from 'services/models/Vehicle';
import { ServiceException } from 'services/utils/ServiceException';
import fetchAPI from 'utils/fetchAPI';

export interface UpdateVehicleEvent {
  id: VehicleEvent['_id'];
  data: Pick<VehicleEvent, 'attach' | 'description' | 'extraFees' | 'fuelFees' | 'reminderDate' | 'totalKilometers' | 'vehicle'>;
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
  const reminderDate = isMoment(data.reminderDate) ? data.reminderDate.valueOf() : data.reminderDate;
  const response: AxiosResponse<ResponseSuccess | ResponseFailure> = await fetchAPI.request({
    method: 'PUT',
    url: `/v1.0/company/vehicle-events/${id}`,
    data: {
      ...data,
      reminderDate,
      extraFees: Number(data.extraFees),
      fuelFees: Number(data.fuelFees),
      totalKilometers: Number(data.totalKilometers),
      attach: data.attach?._id,
    },
  });
  if (response.data.code === 0) {
    return response.data as ResponseSuccess;
  }
  const response_ = response as AxiosResponse<ResponseFailure>;
  throw new ServiceException(response_.data.message, { cause: response_.data });
};
