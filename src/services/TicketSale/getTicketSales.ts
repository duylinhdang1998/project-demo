import { AxiosResponse } from 'axios';
import { Pagination, Searcher, Sorter } from 'services/@types/SearchParams';
import { ResponseSuccess } from 'services/models/Response';
import { TicketSale } from 'services/models/TicketSale';
import { getSearchParams } from 'services/utils/getSearchParams';
import { getSortParams } from 'services/utils/getSortParams';
import fetchAPI from 'utils/fetchAPI';

export interface GetTicketSales {
  page: Pagination;
  sorter: Sorter<TicketSale>;
  searcher: Searcher<TicketSale>;
}

export const RECORDS_PER_PAGE = 8;
export const getTicketSales = async ({ page, sorter, searcher }: GetTicketSales): Promise<ResponseSuccess<TicketSale>> => {
  const response: AxiosResponse<ResponseSuccess<TicketSale>> = await fetchAPI.request({
    url: '/v1.0/company/ticket-sales',
    params: {
      limit: RECORDS_PER_PAGE,
      offset: page * RECORDS_PER_PAGE,
      ...getSortParams(sorter),
      ...getSearchParams(searcher),
    },
  });
  return response.data;
};
