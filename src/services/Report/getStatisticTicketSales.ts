import { AxiosResponse } from 'axios';
import { ResponseDetailSuccess, ResponseFailure } from 'services/models/Response';
import { ServiceException } from 'services/utils/ServiceException';
import fetchAPI from 'utils/fetchAPI';

interface ResponseData {
  totalSales: number;
  totalTickets: number;
}

export const RECORDS_PER_PAGE = 8;
export const getStatisticTicketSales = async (): Promise<ResponseDetailSuccess<ResponseData>> => {
  const response: AxiosResponse<ResponseDetailSuccess<ResponseData> | ResponseFailure> = await fetchAPI.request({
    url: '/v1.0/company/ticket-sales/statistics',
  });
  if (response.data.code === 0) {
    return response.data as ResponseDetailSuccess<ResponseData>;
  }
  const response_ = response as AxiosResponse<ResponseFailure>;
  throw new ServiceException(response_.data.message, response_.data);
};
