import { AxiosResponse } from 'axios';
import { TicketSale } from 'services/models/TicketSale';
import { ResponseDetailSuccess, ResponseFailure } from 'services/models/Response';
import fetchAPI from 'utils/fetchAPI';
import { ServiceException } from 'services/utils/ServiceException';

export interface GetTicketSalesOfOrder {
  orderCode: TicketSale['orderCode'];
}

export const getTicketSalesOfOrder = async ({ orderCode }: GetTicketSalesOfOrder) => {
  const response: AxiosResponse<ResponseDetailSuccess<TicketSale[]> | ResponseFailure> = await fetchAPI.request({
    url: `/v1.0/company/ticket-sales/${orderCode}/orders`,
  });
  if (response.data.code === 0) {
    return response.data as ResponseDetailSuccess<TicketSale[]>;
  }
  const response_ = response as AxiosResponse<ResponseFailure>;
  throw new ServiceException(response_.data.message, response_.data);
};
