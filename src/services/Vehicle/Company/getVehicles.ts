import { AxiosResponse } from 'axios';
import { Pagination, Searcher, Sorter } from 'services/@types/SearchParams';
import { ResponseSuccess } from 'services/models/Response';
import { Vehicle } from 'services/models/Vehicle';
import { getMaxLimit } from 'services/utils/getMaxLimit';
import { getMinOffset } from 'services/utils/getMinOffset';
import { getSearchParams } from 'services/utils/getSearchParams';
import { getSortParams } from 'services/utils/getSortParams';
import fetchAPI from 'utils/fetchAPI';

export interface GetVehicles {
  page: Pagination;
  sorter: Sorter<Vehicle>;
  searcher: Searcher<Vehicle>;
  isGetAll?: boolean;
}

export const RECORDS_PER_PAGE = 8;
export const getVehicles = async ({ page, sorter, searcher, isGetAll }: GetVehicles): Promise<ResponseSuccess<Vehicle>> => {
  const response: AxiosResponse<ResponseSuccess<Vehicle>> = await fetchAPI.request({
    url: '/v1.0/company/vehicles',
    params: {
      limit: isGetAll ? getMaxLimit() : RECORDS_PER_PAGE,
      offset: isGetAll ? getMinOffset() : page * RECORDS_PER_PAGE,
      ...getSortParams(sorter),
      ...getSearchParams(searcher),
    },
  });
  return response.data;
};
