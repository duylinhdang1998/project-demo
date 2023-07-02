import { AxiosResponse } from 'axios';
import { omit } from 'lodash-es';
import { ResponseDetailSuccess, ResponseFailure } from 'services/models/Response';
import { Route, RoutePoint, RoutePointPriceType } from 'services/models/Route';
import { ServiceException } from 'services/utils/ServiceException';
import fetchAPI from 'utils/fetchAPI';

type ResponseData = true;

export interface UpdateGeneralInfomationTripWhenHasRoutePointDeleted {
  data: Pick<Route, 'vehicle' | 'departureTime' | 'departurePoint'> & {
    pointCode: Route['departurePointCode'];
    stopPoints: Array<
      Pick<RoutePoint, 'durationTime' | 'stopPoint'> & {
        pointCode: RoutePoint['stopPointCode'];
        routePointId: RoutePoint['_id'];
        ECOPrices: Array<{ passengerType: RoutePointPriceType; price: number }>;
        VIPPrices: Array<{ passengerType: RoutePointPriceType; price: number }>;
      }
    >;
    tripType: Route['tripType'];
  };
  routeCode: Route['routeCode'];
}

export const updateGeneralInfomationTripWhenHasRoutePointDeleted = async ({
  data,
  routeCode,
}: UpdateGeneralInfomationTripWhenHasRoutePointDeleted) => {
  const response: AxiosResponse<ResponseDetailSuccess<ResponseData> | ResponseFailure> = await fetchAPI.request({
    method: 'PUT',
    url: `/v1.0/company/routes/${routeCode}/delete-route/update`,
    data: {
      ...data,
      vehicle: data.vehicle?._id,
      stopPoints: data.stopPoints.map(routePoint => ({
        ...omit(routePoint, 'routePointId'),
        durationTime: Number(routePoint.durationTime),
        ECOPrices: routePoint.ECOPrices.map(ECOPrice => ({ ...ECOPrice, price: Number(ECOPrice.price) })),
        VIPPrices: routePoint.VIPPrices.map(VIPPrice => ({ ...VIPPrice, price: Number(VIPPrice.price) })),
      })),
    },
  });
  if (response.data.code === 0) {
    return response.data as ResponseDetailSuccess<ResponseData>;
  }
  const response_ = response as AxiosResponse<ResponseFailure>;
  throw new ServiceException(response_.data.message, response_.data);
};
