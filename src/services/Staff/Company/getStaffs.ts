import { AxiosResponse } from 'axios';
import { Pagination, Searcher, Sorter } from 'services/@types/SearchParams';
import { ResponseSuccess } from 'services/models/Response';
import { Staff } from 'services/models/Staff';
import { getSearchParams } from 'services/utils/getSearchParams';
import { getSortParams } from 'services/utils/getSortParams';
import fetchAPI from 'utils/fetchAPI';

export interface GetStaffs {
  page: Pagination;
  sorter: Sorter<Staff>;
  searcher: Searcher<Staff>;
}

export const RECORDS_PER_PAGE = 8;
export const getStaffs = async ({ page, sorter, searcher }: GetStaffs): Promise<ResponseSuccess<Staff>> => {
  const response: AxiosResponse<ResponseSuccess<Staff>> = await fetchAPI.request({
    url: '/v1.0/company/staffs',
    params: {
      limit: RECORDS_PER_PAGE,
      offset: page * RECORDS_PER_PAGE,
      ...getSortParams(sorter),
      ...getSearchParams(searcher),
    },
  });
  return response.data;
};
