import { AxiosResponse } from 'axios';
import { Pagination, Searcher, Sorter } from 'services/@types/SearchParams';
import { Office } from 'services/models/Office';
import { ResponseSuccess } from 'services/models/Response';
import { getMaxLimit } from 'services/utils/getMaxLimit';
import { getMinOffset } from 'services/utils/getMinOffset';
import { getSearchParams } from 'services/utils/getSearchParams';
import { getSortParams } from 'services/utils/getSortParams';
import fetchAPI from 'utils/fetchAPI';

export interface GetOffices {
  page: Pagination;
  sorter: Sorter<Office>;
  searcher: Searcher<Office>;
  isGetAll?: boolean;
}

export const RECORDS_PER_PAGE = 8;
export const getOffices = async ({ page, sorter, searcher, isGetAll }: GetOffices): Promise<ResponseSuccess<Office>> => {
  const response: AxiosResponse<ResponseSuccess<Office>> = await fetchAPI.request({
    url: '/v1.0/company/office-manager',
    params: {
      limit: isGetAll ? getMaxLimit() : RECORDS_PER_PAGE,
      offset: isGetAll ? getMinOffset() : page * RECORDS_PER_PAGE,
      ...getSortParams(sorter),
      ...(isGetAll ? {} : getSearchParams(searcher)),
    },
  });
  return response.data;
};
