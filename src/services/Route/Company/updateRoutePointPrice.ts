import { AxiosResponse } from 'axios';
import { ResponseDetailSuccess, ResponseFailure } from 'services/models/Response';
import { RoutePoint, RoutePointPriceType } from 'services/models/Route';
import { ServiceException } from 'services/utils/ServiceException';
import fetchAPI from 'utils/fetchAPI';

export interface UpdateRoutePointPrice {
  routePointId: RoutePoint['_id'];
  data: {
    ECOPrices: Array<{ passengerType: RoutePointPriceType; price: number }>;
    VIPPrices: Array<{ passengerType: RoutePointPriceType; price: number }>;
  };
}

interface ResponseData {
  acknowledged: true;
  modifiedCount: 1;
  upsertedId: null;
  upsertedCount: 0;
  matchedCount: 1;
}

export const updateRoutePointPrice = async ({ data, routePointId }: UpdateRoutePointPrice) => {
  const response: AxiosResponse<ResponseDetailSuccess<ResponseData> | ResponseFailure> = await fetchAPI.request({
    method: 'PUT',
    url: `/v1.0/company/routes/${routePointId}/route-points`,
    data,
  });
  if (response.data.code === 0) {
    return response.data as ResponseDetailSuccess<ResponseData>;
  }
  const response_ = response as AxiosResponse<ResponseFailure>;
  throw new ServiceException(response_.data.message, response_.data);
};
