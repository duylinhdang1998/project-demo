import { AxiosResponse } from 'axios';
import { ResponseDetailSuccess, ResponseFailure } from 'services/models/Response';
import { TicketSale } from 'services/models/TicketSale';
import { ServiceException } from 'services/utils/ServiceException';
import fetchAPI from 'utils/fetchAPI';

export interface CreateTicketSaleOneTrip {
  routePoint: Required<TicketSale>['routePoint']['_id'];
  departureTime: TicketSale['departureTime'];
  departurePoint: TicketSale['departurePoint'];
  arrivalPoint: TicketSale['arrivalPoint'];
  passengers: TicketSale['passengers'];
  email: TicketSale['email'];
}

export const createTicketSaleOneTrip = async (data: CreateTicketSaleOneTrip) => {
  const response: AxiosResponse<ResponseDetailSuccess<TicketSale> | ResponseFailure> = await fetchAPI.request({
    method: 'POST',
    url: '/v1.0/company/ticket-sales',
    data,
  });
  if (response.data.code === 0) {
    return response.data as ResponseDetailSuccess<TicketSale>;
  }
  const response_ = response as AxiosResponse<ResponseFailure>;
  throw new ServiceException(response_.data.message, response_.data);
};
