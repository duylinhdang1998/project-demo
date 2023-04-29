import { AxiosResponse } from 'axios';
import { Pagination, Searcher, Sorter } from 'services/@types/SearchParams';
import { ResponseFailure, ResponseSuccess } from 'services/models/Response';
import { Route } from 'services/models/Route';
import { getSearchParams } from 'services/utils/getSearchParams';
import { getSortParams } from 'services/utils/getSortParams';
import { ServiceException } from 'services/utils/ServiceException';
import fetchAPI from 'utils/fetchAPI';

export interface GetRoutes {
  page: Pagination;
  sorter: Sorter<Route>;
  searcher: Searcher<Route>;
}

export const RECORDS_PER_PAGE = 8;
export const getRoutes = async ({ page, sorter, searcher }: GetRoutes): Promise<ResponseSuccess<Route>> => {
  const response: AxiosResponse<ResponseSuccess<Route> | ResponseFailure> = await fetchAPI.request({
    url: '/v1.0/company/routes',
    params: {
      limit: RECORDS_PER_PAGE,
      offset: page * RECORDS_PER_PAGE,
      ...getSortParams(sorter),
      ...getSearchParams<Route>({
        ...searcher,
        status: {
          operator: 'eq',
          value: 'INACTIVE',
        },
      }),
    },
  });
  if (response.data.code === 0) {
    return response.data as ResponseSuccess<Route>;
  }
  const response_ = response as AxiosResponse<ResponseFailure>;
  throw new ServiceException(response_.data.message, response_.data);
};
