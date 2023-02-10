import { AxiosResponse } from 'axios';
import { Pagination, Searcher, Sorter } from 'services/@types/SearchParams';
import { Office } from 'services/models/Office';
import fetchAPI from 'utils/fetchAPI';

export interface GetOffices {
  page: Pagination;
  sorter: Sorter<Office>;
  searcher: Searcher<Office>;
}

interface ResponseSuccess {
  code: number;
  data: {
    hits: Office[];
    pagination: {
      totalRows: number;
      totalPages: number;
    };
  };
}

export const RECORDS_PER_PAGE = 8;
export const getOffices = async ({ page, sorter, searcher }: GetOffices): Promise<ResponseSuccess> => {
  const sortParams = Object.keys(sorter).reduce<Sorter<Office>>((res, sorterKey) => {
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
    url: '/v1.0/company/office-manager',
    params: {
      limit: RECORDS_PER_PAGE,
      offset: page * RECORDS_PER_PAGE,
      ...sortParams,
      ...searchParams,
    },
  });
  return response.data;
};
