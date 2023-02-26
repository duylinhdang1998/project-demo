import { AxiosResponse } from 'axios';
import { Pagination, Searcher, Sorter } from 'services/@types/SearchParams';
import { Passenger } from 'services/models/Passenger';
import { ResponseSuccess } from 'services/models/Response';
import { getMaxLimit } from 'services/utils/getMaxLimit';
import { getMinOffset } from 'services/utils/getMinOffset';
import { getSearchParams } from 'services/utils/getSearchParams';
import { getSortParams } from 'services/utils/getSortParams';
import fetchAPI from 'utils/fetchAPI';

export interface GetPassengers {
  page: Pagination;
  sorter: Sorter<Passenger>;
  searcher: Searcher<Passenger>;
  isGetAll?: boolean;
}

export const RECORDS_PER_PAGE = 8;
export const getPassengers = async ({ page, searcher, sorter, isGetAll }: GetPassengers) => {
  const response: AxiosResponse<ResponseSuccess<Passenger>> = await fetchAPI.request({
    url: '/v1.0/company/passengers',
    params: {
      limit: isGetAll ? getMaxLimit() : RECORDS_PER_PAGE,
      offset: isGetAll ? getMinOffset() : page * RECORDS_PER_PAGE,
      ...(isGetAll ? {} : getSortParams(sorter)),
      ...(isGetAll ? {} : getSearchParams(searcher)),
    },
  });

  return response.data;
};
