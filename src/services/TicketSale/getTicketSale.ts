import { AxiosResponse } from 'axios';
import { TicketSale } from 'services/models/TicketSale';
import { ResponseDetailSuccess } from 'services/models/Response';
import fetchAPI from 'utils/fetchAPI';

export interface GetTicketSale {
  orderCode: TicketSale['orderCode'];
}

export const getTicketSale = async ({ orderCode }: GetTicketSale) => {
  const response: AxiosResponse<ResponseDetailSuccess<TicketSale>> = await fetchAPI.request({
    url: `/v1.0/company/ticket-sales/${orderCode}/orders`,
  });
  return response.data;
};
