import { AxiosResponse } from 'axios';
import { ResponseDetailSuccess, ResponseFailure } from 'services/models/Response';
import { Route, RoutePoint, RoutePointPriceType } from 'services/models/Route';
import { ServiceException } from 'services/utils/ServiceException';
import fetchAPI from 'utils/fetchAPI';
import { uniqArrayTimestampWithDayInYearNSetHours12 } from 'utils/handleTimestampWithDayInYear';

export type CreateOneStopTrip = Pick<Route, 'vehicle' | 'departureTime' | 'departurePoint'> & {
  pointCode: Route['departurePointCode'];
  stopPoints: [
    Pick<RoutePoint, 'durationTime' | 'stopPoint'> & {
      ECOPrices: Array<{ passengerType: RoutePointPriceType; price: number }>;
      VIPPrices: Array<{ passengerType: RoutePointPriceType; price: number }>;
      pointCode: RoutePoint['stopPointCode'];
    },
  ];
  tripType: Extract<Route['tripType'], 'ONE_TRIP'>;
};

export const createOneStopTrip = async (data: CreateOneStopTrip): Promise<ResponseDetailSuccess<Route>> => {
  const response: AxiosResponse<ResponseDetailSuccess<Route> | ResponseFailure> = await fetchAPI.request({
    method: 'POST',
    url: '/v1.0/company/routes',
    data: {
      ...data,
      vehicle: data.vehicle?._id,
      stopPoints: data.stopPoints.map(routePoint => ({
        ...routePoint,
        durationTime: Number(routePoint.durationTime),
        ECOPrices: routePoint.ECOPrices.map(ECOPrice => ({ ...ECOPrice, price: Number(ECOPrice.price) })),
        VIPPrices: routePoint.VIPPrices.map(VIPPrice => ({ ...VIPPrice, price: Number(VIPPrice.price) })),
      })),
    },
  });
  if (response.data.code === 0) {
    const data = response.data as ResponseDetailSuccess<Route>;
    return {
      ...data,
      data: {
        ...data.data,
        dayoffs: uniqArrayTimestampWithDayInYearNSetHours12(data.data.dayoffs),
        particularDays: uniqArrayTimestampWithDayInYearNSetHours12(data.data.particularDays),
      },
    } as ResponseDetailSuccess<Route>;
  }
  const response_ = response as AxiosResponse<ResponseFailure>;
  throw new ServiceException(response_.data.message, response_.data);
};
