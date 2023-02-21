import { AxiosResponse } from 'axios';
import { ResponseDetailSuccess, ResponseFailure } from 'services/models/Response';
import { Route } from 'services/models/Route';
import { ServiceException } from 'services/utils/ServiceException';
import fetchAPI from 'utils/fetchAPI';
import { momentToString } from 'utils/momentToString';
import { CreateOneStopTrip } from './createOneStopTrip';

export type CreateMultipleStopTrip = Pick<Route, 'vehicle' | 'departureTime' | 'departurePoint'> & {
  stopPoints: Array<CreateOneStopTrip['stopPoints'][0]>;
  routeType: Extract<Route['routeType'], 'MULTI_STOP'>;
};

export const createMultipleStopTrip = async (data: CreateMultipleStopTrip) => {
  const response: AxiosResponse<ResponseDetailSuccess<Route> | ResponseFailure> = await fetchAPI.request({
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
    } as CreateMultipleStopTrip,
  });
  if (response.data.code === 0) {
    return response.data as ResponseDetailSuccess<Route>;
  }
  const response_ = response as AxiosResponse<ResponseFailure>;
  throw new ServiceException(response_.data.message, { cause: response_.data });
};
