import { AxiosResponse } from 'axios';
import { Pagination, Searcher } from 'services/@types/SearchParams';
import { ResponseDetailSuccess, ResponseFailure } from 'services/models/Response';
import { RouteOfTicketSale } from 'services/models/TicketSale';
import { getSearchParams } from 'services/utils/getSearchParams';
import { ServiceException } from 'services/utils/ServiceException';
import fetchAPI from 'utils/fetchAPI';

interface ResponseData {
  routes: RouteOfTicketSale[];
  counts: Array<{ _id: RouteOfTicketSale['tripType']; count: number }>;
}

type ResponsePackage = RouteOfTicketSale[];

export interface SearchRoutes {
  page: Pagination;
  searcher: Searcher<RouteOfTicketSale, 'quantity' | 'departureTime' | 'merchandises'>;
}

const RECORDS_PER_PAGE = 4;
export const searchRoutes = async ({ page, searcher }: SearchRoutes) => {
  const response: AxiosResponse<ResponseDetailSuccess<ResponseData> | ResponseFailure> = await fetchAPI.request({
    url: '/v1.0/company/routes/search',
    params: {
      limit: RECORDS_PER_PAGE,
      offset: page * RECORDS_PER_PAGE,
      ...getSearchParams(searcher),
    },
  });
  if (response.data.code === 0) {
    return response.data as ResponseDetailSuccess<ResponseData>;
  }
  const response_ = response as AxiosResponse<ResponseFailure>;
  throw new ServiceException(response_.data.message, response_.data);
};

export const searchRoutesPackage = async ({ page, searcher }: SearchRoutes) => {
  const response: AxiosResponse<ResponseDetailSuccess<ResponsePackage> | ResponseFailure> = await fetchAPI.request({
    url: '/v1.0/company/routes/search/package',
    params: {
      limit: RECORDS_PER_PAGE,
      offset: page * RECORDS_PER_PAGE,
      ...getSearchParams(searcher),
    },
  });
  if (response.data.code === 0) {
    return response.data as ResponseDetailSuccess<ResponsePackage>;
  }
  const response_ = response as AxiosResponse<ResponseFailure>;
  throw new ServiceException(response_.data.message, response_.data);
};
