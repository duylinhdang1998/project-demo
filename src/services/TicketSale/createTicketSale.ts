import { AxiosResponse } from 'axios';
import { TicketSale } from 'services/models/TicketSale';
import { ResponseDetailSuccess, ResponseFailure } from 'services/models/Response';
import { ServiceException } from 'services/utils/ServiceException';
import fetchAPI from 'utils/fetchAPI';
import { PaymentGateway } from 'services/models/PaymentGateway';

interface ResponseData {
  order: [TicketSale];
  paymentLink: Array<{
    href: string;
    rel: 'self' | 'approve' | 'update' | 'capture';
    method: 'GET' | 'PATCH' | 'POST';
  }>;
}

export type CreateTicketSale = Pick<TicketSale, 'route' | 'departureTime' | 'departurePoint' | 'arrivalPoint' | 'passengers' | 'email'> & {
  paymentType: PaymentGateway;
  returnUrl: string;
  cancelUrl: string;
};

export const createTicketSale = async (data: CreateTicketSale): Promise<ResponseDetailSuccess<ResponseData>> => {
  const response: AxiosResponse<ResponseDetailSuccess<ResponseData> | ResponseFailure> = await fetchAPI.request({
    method: 'POST',
    url: '/v1.0/company/ticket-sales',
    data,
  });
  if (response.data.code === 0) {
    return response.data as ResponseDetailSuccess<ResponseData>;
  }
  const response_ = response as AxiosResponse<ResponseFailure>;
  throw new ServiceException(response_.data.message, { cause: response_.data });
};
