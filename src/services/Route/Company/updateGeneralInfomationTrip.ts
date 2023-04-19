import { AxiosResponse } from 'axios';
import { ResponseDetailSuccess, ResponseFailure } from 'services/models/Response';
import { Route, RoutePoint, RoutePointPriceType } from 'services/models/Route';
import { ServiceException } from 'services/utils/ServiceException';
import fetchAPI from 'utils/fetchAPI';

export interface UpdateGeneralInfomationTrip {
  data: Pick<Route, 'vehicle' | 'departureTime' | 'departurePoint'> & {
    stopPoints: Array<
      Pick<RoutePoint, 'durationTime' | 'stopPoint'> & {
        routePointId: RoutePoint['_id'];
        ECOPrices: Array<{ passengerType: RoutePointPriceType; price: number }>;
        VIPPrices: Array<{ passengerType: RoutePointPriceType; price: number }>;
      }
    >;
    tripType: Route['tripType'];
  };
  routeCode: Route['routeCode'];
}

export const updateGeneralInfomationTrip = async ({ data, routeCode }: UpdateGeneralInfomationTrip) => {
  const response: AxiosResponse<ResponseDetailSuccess<Route> | ResponseFailure> = await fetchAPI.request({
    method: 'PUT',
    url: `/v1.0/company/routes/${routeCode}/normal/update`,
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
    return response.data as ResponseDetailSuccess<Route>;
  }
  const response_ = response as AxiosResponse<ResponseFailure>;
  throw new ServiceException(response_.data.message, response_.data);
};
