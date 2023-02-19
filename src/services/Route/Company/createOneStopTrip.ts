import { AxiosResponse } from 'axios';
import { Route, StopPoint } from 'services/models/Route';
import { ServiceException } from 'services/utils/ServiceException';
import fetchAPI from 'utils/fetchAPI';
import { momentToString } from 'utils/momentToString';

interface ResponseSuccess {
  code: 0;
  data: Route;
}

interface ResponseFailure {
  code: 1000;
  timestamp: string;
  path: string;
  message: string;
}

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
  const response: AxiosResponse<ResponseSuccess | ResponseFailure> = await fetchAPI.request({
    method: 'POST',
    url: '/v1.0/company/routes',
    data: {
      ...data,
      departureTime: momentToString(data.departureTime, 'HH:mm'),
      stopPoints: data.stopPoints.map(stopPoint => ({
        ...stopPoint,
        durationTime: Number(stopPoint.durationTime),
        ECOPrices: stopPoint.ECOPrices.map(ECOPrice => ({ ...ECOPrice, price: Number(ECOPrice.price) })),
        VIPPrices: stopPoint.VIPPrices.map(VIPPrice => ({ ...VIPPrice, price: Number(VIPPrice.price) })),
      })),
    } as CreateOneStopTrip,
  });
  if (response.data.code === 0) {
    return response.data as ResponseSuccess;
  }
  const response_ = response as AxiosResponse<ResponseFailure>;
  throw new ServiceException(response_.data.message, { cause: response_.data });
};
