import { AxiosResponse } from 'axios';
import { ResponseDetailSuccess, ResponseFailure } from 'services/models/Response';
import { TicketSale } from 'services/models/TicketSale';
import { ServiceException } from 'services/utils/ServiceException';
import fetchAPI from 'utils/fetchAPI';

interface ResponseData {
  acknowledged: true;
  modifiedCount: 1;
  upsertedId: null;
  upsertedCount: 0;
  matchedCount: 1;
}

export interface UpdateOrderStatus {
  orderCode: TicketSale['orderCode'];
  ticketStatus: TicketSale['ticketStatus'];
  reason?: string;
}

export const updateOrderStatus = async ({ orderCode, ticketStatus, reason }: UpdateOrderStatus) => {
  const response: AxiosResponse<ResponseDetailSuccess<ResponseData> | ResponseFailure> = await fetchAPI.request({
    method: 'POST',
    url: `/v1.0/company/ticket-sales/${orderCode}/status`,
    data: {
      ticketStatus,
      reason,
    },
  });
  if (response.data.code === 0) {
    return response.data as ResponseDetailSuccess<ResponseData>;
  }
  const response_ = response as AxiosResponse<ResponseFailure>;
  throw new ServiceException(response_.data.message, response_.data);
};
