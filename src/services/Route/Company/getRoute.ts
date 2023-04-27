import { AxiosResponse } from 'axios';
import { ResponseDetailSuccess, ResponseFailure } from 'services/models/Response';
import { Route } from 'services/models/Route';
import { RouteOfTicketSale } from 'services/models/TicketSale';
import { ServiceException } from 'services/utils/ServiceException';
import fetchAPI from 'utils/fetchAPI';

export interface GetRoute {
  routeCode: Route['routeCode'];
}

export const getRoute = async ({ routeCode }: GetRoute) => {
  const response: AxiosResponse<ResponseDetailSuccess<Route> | ResponseFailure> = await fetchAPI.request({
    url: `/v1.0/company/routes/${routeCode}/detail`,
  });
  if (response.data.code === 0) {
    return response.data as ResponseDetailSuccess<Route>;
  }
  const response_ = response as AxiosResponse<ResponseFailure>;
  throw new ServiceException(response_.data.message, response_.data);
};

export const getRoutePkgDetail = async (routeCode: Route['routeCode']) => {
  const response: AxiosResponse<ResponseDetailSuccess<RouteOfTicketSale> | ResponseFailure> = await fetchAPI.request({
    url: `/v1.0/company/routes-point/${routeCode}/detail`,
  });
  if (response.data.code === 0) {
    return response.data as ResponseDetailSuccess<RouteOfTicketSale>;
  }
  const response_ = response as AxiosResponse<ResponseFailure>;
  throw new ServiceException(response_.data.message, response_.data);
};
