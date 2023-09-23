import { useRequest } from 'ahooks';
import { AxiosResponse } from 'axios';
import { ResponseDetailSuccess, ResponseFailure } from 'services/models/Response';
import { ServiceException } from 'services/utils/ServiceException';
import fetchAPI from 'utils/fetchAPI';

interface ResponseData {
  totalPrices: number;
  totalTickets: number;
}

export const getStatisticTicketSales = async (): Promise<ResponseDetailSuccess<ResponseData>> => {
  const response: AxiosResponse<ResponseDetailSuccess<ResponseData> | ResponseFailure> = await fetchAPI.request({
    url: '/v1.0/company/package-sale/statistics',
  });
  if (response.data.code === 0) {
    return response.data as ResponseDetailSuccess<ResponseData>;
  }
  const response_ = response as AxiosResponse<ResponseFailure>;
  throw new ServiceException(response_.data.message, response_.data);
};

export const useGetStatisticPackageSales = () => {
  return useRequest<ResponseDetailSuccess<ResponseData>, []>(getStatisticTicketSales);
};
