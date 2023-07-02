import { AxiosResponse } from 'axios';
import { Pagination, Searcher, Sorter } from 'services/@types/SearchParams';
import { ResponseFailure, ResponseSuccess } from 'services/models/Response';
import { RouteOfTicketSale } from 'services/models/TicketSale';
import { getSearchParams } from 'services/utils/getSearchParams';
import { getSortParams } from 'services/utils/getSortParams';
import { ServiceException } from 'services/utils/ServiceException';
import fetchAPI from 'utils/fetchAPI';

export interface SearchRoutes {
  tripType: RouteOfTicketSale['tripType'];
  page: Pagination;
  searcher: Searcher<RouteOfTicketSale, 'quantity' | 'returnTime' | 'departureTime' | 'merchandises' | 'stopPointCode' | 'departurePointCode'>;
  sorter: Sorter<RouteOfTicketSale>;
}

const RECORDS_PER_PAGE = 4;
export const searchRoutes = async ({ tripType, page, searcher, sorter }: SearchRoutes) => {
  const response: AxiosResponse<ResponseSuccess<RouteOfTicketSale> | ResponseFailure> = await fetchAPI.request({
    url: tripType === 'MULTI_STOP' ? '/v1.0/company/routes/search/round-trip' : '/v1.0/company/routes/search',
    params: {
      limit: RECORDS_PER_PAGE,
      offset: page * RECORDS_PER_PAGE,
      ...getSearchParams(searcher),
      ...getSortParams(sorter, false),
    },
  });
  if (response.data.code === 0) {
    return response.data as ResponseSuccess<RouteOfTicketSale>;
  }
  const response_ = response as AxiosResponse<ResponseFailure>;
  throw new ServiceException(response_.data.message, response_.data);
};

export const searchRoutesPackage = async ({ page, searcher, sorter }: SearchRoutes) => {
  const response: AxiosResponse<ResponseSuccess<RouteOfTicketSale> | ResponseFailure> = await fetchAPI.request({
    url: '/v1.0/company/routes/search/package',
    params: {
      limit: RECORDS_PER_PAGE,
      offset: page * RECORDS_PER_PAGE,
      ...getSearchParams(searcher),
      ...getSortParams(sorter),
    },
  });
  if (response.data.code === 0) {
    return response.data as ResponseSuccess<RouteOfTicketSale>;
  }
  const response_ = response as AxiosResponse<ResponseFailure>;
  throw new ServiceException(response_.data.message, response_.data);
};
