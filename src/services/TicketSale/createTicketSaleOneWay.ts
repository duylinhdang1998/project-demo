import { AxiosResponse } from 'axios';
import { RouteOfTicketSale, TicketSale } from 'services/models/TicketSale';
import { ResponseDetailSuccess, ResponseFailure } from 'services/models/Response';
import { ServiceException } from 'services/utils/ServiceException';
import fetchAPI from 'utils/fetchAPI';
import { PaymentGateway } from 'services/models/PaymentGateway';

export type CreateTicketSaleOneWay = Pick<TicketSale, 'departureTime' | 'departurePoint' | 'arrivalPoint' | 'passengers' | 'email'> & {
  paymentType: PaymentGateway;
  returnUrl: string;
  cancelUrl: string;
  routeId: RouteOfTicketSale;
};

export const createTicketSaleOneWay = async (data: CreateTicketSaleOneWay) => {
  const response: AxiosResponse<ResponseDetailSuccess<TicketSale> | ResponseFailure> = await fetchAPI.request({
    method: 'POST',
    url: '/v1.0/company/ticket-sales',
    data: {
      ...data,
      route: data.routeId,
    },
  });
  if (response.data.code === 0) {
    return response.data as ResponseDetailSuccess<TicketSale>;
  }
  const response_ = response as AxiosResponse<ResponseFailure>;
  throw new ServiceException(response_.data.message, response_.data);
};
