import { AxiosResponse } from 'axios';
import { Pagination, Searcher, Sorter } from 'services/@types/SearchParams';
import { Route } from 'services/models/Route';
import { getSearchParams } from 'services/utils/getSearchParams';
import { getSortParams } from 'services/utils/getSortParams';
import fetchAPI from 'utils/fetchAPI';

export interface GetRoutes {
  page: Pagination;
  sorter: Sorter<Route>;
  searcher: Searcher<Route>;
}

interface ResponseSuccess {
  code: number;
  data: {
    hits: Route[];
    pagination: {
      totalRows: number;
      totalPages: number;
    };
  };
}

export const RECORDS_PER_PAGE = 8;
export const getRoutes = async ({ page, sorter, searcher }: GetRoutes): Promise<ResponseSuccess> => {
  const response: AxiosResponse<ResponseSuccess> = await fetchAPI.request({
    url: '/v1.0/company/routes',
    params: {
      limit: RECORDS_PER_PAGE,
      offset: page * RECORDS_PER_PAGE,
      ...getSortParams(sorter),
      ...getSearchParams(searcher),
    },
  });
  return response.data;
};
