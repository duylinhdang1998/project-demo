import { AxiosResponse } from 'axios';
import { ResponseDetailSuccess, ResponseFailure } from 'services/models/Response';
import { RouteOfTicketSale } from 'services/models/TicketSale';
import { ServiceException } from 'services/utils/ServiceException';
import { isResponseError } from 'services/utils/isResponseError';
import fetchAPI from 'utils/fetchAPI';

export const getFullTrip = async (routeCode: string) => {
  const response: AxiosResponse<ResponseDetailSuccess<RouteOfTicketSale> | ResponseFailure> = await fetchAPI.request({
    url: `/v1.0/company/routes/${routeCode}/full-trips`,
  });
  if (isResponseError(response)) {
    throw new ServiceException(response.data.message, response.data);
  }
  return response.data as ResponseDetailSuccess<RouteOfTicketSale>;
};
