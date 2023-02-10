import { AxiosResponse } from 'axios';
import { Pagination, Searcher, Sorter } from 'services/@types/SearchParams';
import { PackageSetting } from 'services/models/PackageSetting';
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
  const sortParams = Object.keys(sorter).reduce<Sorter<PackageSetting>>((res, sorterKey) => {
    const key = `${sorterKey}[sort]`;
    return {
      ...res,
      [key]: sorter[sorterKey],
    };
  }, {});

  const searchParams = Object.keys(searcher).reduce<Record<string, string>>((res, searchKey) => {
    const key = `${searchKey}[contains]`;
    return {
      ...res,
      [key]: searcher[searchKey],
    };
  }, {});

  const response: AxiosResponse<ResponseSuccess> = await fetchAPI.request({
    url: '/v1.0/company/package-setting',
    params: {
      limit: RECORDS_PER_PAGE,
      offset: page * RECORDS_PER_PAGE,
      ...sortParams,
      ...searchParams,
    },
  });
  return response.data;
};
