import { AxiosResponse } from 'axios';
import { Pagination, Searcher, Sorter } from 'services/@types/SearchParams';
import { PackageSetting } from 'services/models/PackageSetting';
import { ResponseSuccess } from 'services/models/Response';
import { getSearchParams } from 'services/utils/getSearchParams';
import { getSortParams } from 'services/utils/getSortParams';
import fetchAPI from 'utils/fetchAPI';

export interface GetPackageSettings {
  page: Pagination;
  sorter: Sorter<PackageSetting>;
  searcher: Searcher<PackageSetting>;
}

export const RECORDS_PER_PAGE = 8;
export const getPackageSettings = async ({ page, sorter, searcher }: GetPackageSettings): Promise<ResponseSuccess<PackageSetting>> => {
  const response: AxiosResponse<ResponseSuccess<PackageSetting>> = await fetchAPI.request({
    url: '/v1.0/company/package-setting',
    params: {
      limit: RECORDS_PER_PAGE,
      offset: page * RECORDS_PER_PAGE,
      ...getSortParams(sorter),
      ...getSearchParams(searcher),
    },
  });
  return response.data;
};
