import { AxiosResponse } from 'axios';
import { ResponseDetailSuccess, ResponseFailure } from 'services/models/Response';
import { Route, StopPoint } from 'services/models/Route';
import { ServiceException } from 'services/utils/ServiceException';
import fetchAPI from 'utils/fetchAPI';
import { momentToString } from 'utils/momentToString';

export type CreateOneStopTrip = Pick<Route, 'vehicle' | 'departureTime' | 'departurePoint'> & {
  stopPoints: [
    Pick<StopPoint, 'durationTime' | 'stopPoint'> & {
      ECOPrices: Array<{ passengerType: keyof StopPoint['ECOPrices']; price: number }>;
      VIPPrices: Array<{ passengerType: keyof StopPoint['VIPPrices']; price: number }>;
    },
  ];
  routeType: Extract<Route['routeType'], 'ONE_TRIP'>;
};

export const createOneStopTrip = async (data: CreateOneStopTrip) => {
  const response: AxiosResponse<ResponseDetailSuccess<Route> | ResponseFailure> = await fetchAPI.request({
    method: 'POST',
    url: '/v1.0/company/routes',
    data: {
      ...data,
      vehicle: data.vehicle._id,
      departureTime: momentToString(data.departureTime, 'HH:mm'),
      stopPoints: data.stopPoints.map(stopPoint => ({
        ...stopPoint,
        durationTime: Number(stopPoint.durationTime),
        ECOPrices: stopPoint.ECOPrices.map(ECOPrice => ({ ...ECOPrice, price: Number(ECOPrice.price) })),
        VIPPrices: stopPoint.VIPPrices.map(VIPPrice => ({ ...VIPPrice, price: Number(VIPPrice.price) })),
      })),
    },
  });
  if (response.data.code === 0) {
    return response.data as ResponseDetailSuccess<Route>;
  }
  const response_ = response as AxiosResponse<ResponseFailure>;
  throw new ServiceException(response_.data.message, { cause: response_.data });
};
