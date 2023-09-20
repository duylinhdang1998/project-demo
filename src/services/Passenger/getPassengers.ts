import { AxiosResponse } from 'axios';
import { Pagination, Searcher, Sorter } from 'services/@types/SearchParams';
import { Passenger } from 'services/models/Passenger';
import { ResponseFailure, ResponseSuccess } from 'services/models/Response';
import { getMaxLimit } from 'services/utils/getMaxLimit';
import { getMinOffset } from 'services/utils/getMinOffset';
import { getSearchParams } from 'services/utils/getSearchParams';
import { getSortParams } from 'services/utils/getSortParams';
import { ServiceException } from 'services/utils/ServiceException';
import fetchAPI from 'utils/fetchAPI';

export interface GetPassengers {
  page: Pagination;
  sorter: Sorter<Passenger>;
  searcher: Searcher<Passenger>;
  isGetAll?: boolean;
}

export const RECORDS_PER_PAGE = 8;
export const getPassengers = async ({ page, searcher, sorter, isGetAll }: GetPassengers) => {
  const response: AxiosResponse<ResponseSuccess<Passenger> | ResponseFailure> = await fetchAPI.request({
    url: '/v1.0/company/passengers',
    params: {
      limit: isGetAll ? getMaxLimit() : RECORDS_PER_PAGE,
      offset: isGetAll ? getMinOffset() : page * RECORDS_PER_PAGE,
      ...getSortParams(sorter),
      ...(isGetAll ? {} : getSearchParams(searcher)),
    },
  });

  if (response.data.code === 0) {
    return response.data as ResponseSuccess<Passenger>;
  }
  const response_ = response as AxiosResponse<ResponseFailure>;
  throw new ServiceException(response_.data.message, response_.data);
};
