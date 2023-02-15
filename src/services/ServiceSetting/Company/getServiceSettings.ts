import { AxiosResponse } from 'axios';
import { Pagination, Searcher, Sorter } from 'services/@types/SearchParams';
import { ServiceSetting } from 'services/models/ServiceSetting';
import { getSearchParams } from 'services/utils/getSearchParams';
import { getSortParams } from 'services/utils/getSortParams';
import fetchAPI from 'utils/fetchAPI';

export interface GetServiceSettings {
  page: Pagination;
  sorter: Sorter<ServiceSetting>;
  searcher: Searcher<ServiceSetting>;
}

interface ResponseSuccess {
  code: number;
  data: {
    hits: ServiceSetting[];
    pagination: {
      totalRows: number;
      totalPages: number;
    };
  };
}

export const RECORDS_PER_PAGE = 8;

export const getServiceSettings = async ({ page, sorter, searcher }: GetServiceSettings): Promise<ResponseSuccess> => {
  const response: AxiosResponse<ResponseSuccess> = await fetchAPI.request({
    url: '/v1.0/company/service-setting',
    params: {
      limit: RECORDS_PER_PAGE,
      offset: page * RECORDS_PER_PAGE,
      ...getSortParams(sorter),
      ...getSearchParams(searcher),
    },
  });
  return response.data;
};
