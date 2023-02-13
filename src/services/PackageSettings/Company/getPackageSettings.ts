import { AxiosResponse } from 'axios';
import { Pagination, Searcher, Sorter } from 'services/@types/SearchParams';
import { PackageSetting } from 'services/models/PackageSetting';
import { getSearchParams } from 'services/utils/getSearchParams';
import { getSortParams } from 'services/utils/getSortParams';
import fetchAPI from 'utils/fetchAPI';

export interface GetPackageSettings {
  page: Pagination;
  sorter: Sorter<PackageSetting>;
  searcher: Searcher<PackageSetting>;
}

interface ResponseSuccess {
  code: number;
  data: {
    hits: PackageSetting[];
    pagination: {
      totalRows: number;
      totalPages: number;
    };
  };
}

export const RECORDS_PER_PAGE = 8;
export const getPackageSettings = async ({ page, sorter, searcher }: GetPackageSettings): Promise<ResponseSuccess> => {
  const response: AxiosResponse<ResponseSuccess> = await fetchAPI.request({
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
