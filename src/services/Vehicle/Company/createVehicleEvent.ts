import { AxiosResponse } from 'axios';
import { VehicleEvent } from 'services/models/Vehicle';
import { ServiceException } from 'services/utils/ServiceException';
import fetchAPI from 'utils/fetchAPI';
import { momentToNumber } from 'utils/momentToNumber';

interface ResponseSuccess {
  code: number;
  data: VehicleEvent;
}

interface ResponseFailure {
  code: number;
  timestamp: string;
  path: string;
  message: string;
}

export type CreateVehicleEvent = Pick<
  VehicleEvent,
  'attach' | 'description' | 'extraFees' | 'fuelFees' | 'reminderDate' | 'totalKilometers' | 'vehicle'
>;

export const createVehicleEvent = async (data: CreateVehicleEvent) => {
  const response: AxiosResponse<ResponseSuccess | ResponseFailure> = await fetchAPI.request({
    method: 'POST',
    url: '/v1.0/company/vehicle-events',
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
    return response.data as ResponseSuccess;
  }
  const response_ = response as AxiosResponse<ResponseFailure>;
  throw new ServiceException(response_.data.message, { cause: response_.data });
};
