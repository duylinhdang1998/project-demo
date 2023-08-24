import { AxiosResponse } from 'axios';
import { ResponseDetailSuccess, ResponseFailure } from 'services/models/Response';
import { TicketSale } from 'services/models/TicketSale';
import { ServiceException } from 'services/utils/ServiceException';
import fetchAPI from 'utils/fetchAPI';
import { EnumPaymentGateway } from '../models/PaymentGateway';

export interface UpdatePaymentStatusOfOrder {
  ticketCode: TicketSale['ticketCode'];
  paymentStatus: TicketSale['paymentStatus'];
  passengers: TicketSale['passengers'];
  paymentType?: EnumPaymentGateway;
}
export const updatePaymentStatusOfOrder = async (data: UpdatePaymentStatusOfOrder) => {
  const response: AxiosResponse<ResponseDetailSuccess<TicketSale> | ResponseFailure> = await fetchAPI.request({
    method: 'POST',
    url: '/v1.0/company/ticket-sales/update',
    data,
  });
  if (response.data.code === 0) {
    return response.data as ResponseDetailSuccess<TicketSale>;
  }
  const response_ = response as AxiosResponse<ResponseFailure>;
  throw new ServiceException(response_.data.message, response_.data);
};
