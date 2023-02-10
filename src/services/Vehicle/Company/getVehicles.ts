import { AxiosResponse } from 'axios';
import { Pagination, Searcher, Sorter } from 'services/@types/SearchParams';
import { Vehicle } from 'services/models/Vehicle';
import { getSearchParams } from 'services/utils/getSearchParams';
import { getSortParams } from 'services/utils/getSortParams';
import fetchAPI from 'utils/fetchAPI';

export interface GetVehicles {
  page: Pagination;
  sorter: Sorter<Vehicle>;
  searcher: Searcher<Vehicle>;
}

interface ResponseSuccess {
  code: number;
  data: {
    hits: Vehicle[];
    pagination: {
      totalRows: number;
      totalPages: number;
    };
  };
}

export const RECORDS_PER_PAGE = 8;
export const getVehicles = async ({ page, sorter, searcher }: GetVehicles): Promise<ResponseSuccess> => {
  const sortParams = Object.keys(sorter).reduce<Sorter<Vehicle>>((res, sorterKey) => {
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
    url: '/v1.0/company/vehicles',
    params: {
      limit: RECORDS_PER_PAGE,
      offset: page * RECORDS_PER_PAGE,
      ...getSortParams(sorter),
      ...getSearchParams(searcher),
    },
  });
  return response.data;
};
