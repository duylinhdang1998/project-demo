import { AxiosResponse } from 'axios';
import { Pagination, Searcher, Sorter } from 'services/@types/SearchParams';
import { ReportTicketSale } from 'services/models/ReportTicketSale';
import { ResponseSuccess } from 'services/models/Response';
import { getSearchParams } from 'services/utils/getSearchParams';
import { getSortParams } from 'services/utils/getSortParams';
import fetchAPI from 'utils/fetchAPI';

export interface GetReportTicketSales {
  page: Pagination;
  sorter: Sorter<ReportTicketSale>;
  searcher: Searcher<ReportTicketSale>;
}

export const RECORDS_PER_PAGE = 8;
export const getReportTicketSales = async ({ page, sorter, searcher }: GetReportTicketSales): Promise<ResponseSuccess<ReportTicketSale>> => {
  const response: AxiosResponse<ResponseSuccess<ReportTicketSale>> = await fetchAPI.request({
    url: '/v1.0/company/report/ticket',
    params: {
      limit: RECORDS_PER_PAGE,
      offset: page * RECORDS_PER_PAGE,
      ...getSortParams(sorter),
      ...getSearchParams(searcher),
    },
  });
  return response.data;
};
