import { useRequest } from 'ahooks';
import { Options } from 'ahooks/lib/useRequest/src/types';
import { AxiosResponse } from 'axios';
import { Pagination, Searcher, Sorter } from 'services/@types/SearchParams';
import { ParamsSettings } from 'services/models/Response';
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

interface ResponseDetailSuccess {
  code: number;
  data: ServiceSetting;
}

interface DataPostService {
  title?: string;
  icon?: string;
}

export const RECORDS_PER_PAGE = 10;

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

export const useGetServiceSettings = (option?: Options<ResponseSuccess, any>) => {
  return useRequest<ResponseSuccess, [ParamsSettings<ServiceSetting>]>(getServiceSettings, {
    ...option,
    manual: true,
  });
};

export const useAddService = (option?: Options<ResponseSuccess, any>) => {
  const postAddService = async (data: DataPostService) => {
    const response: AxiosResponse<ResponseSuccess> = await fetchAPI.request({
      url: '/v1.0/company/service-setting',
      method: 'POST',
      data,
    });
    return response.data;
  };
  return useRequest<ResponseSuccess, [DataPostService]>(postAddService, {
    ...option,
    manual: true,
  });
};

export const useDeleteService = (option?: Options<ResponseSuccess, any>) => {
  const postDeleteService = async (id: string) => {
    const response: AxiosResponse<ResponseSuccess> = await fetchAPI.request({
      url: `/v1.0/company/service-setting/${id}`,
      method: 'DELETE',
    });
    return response.data;
  };
  return useRequest<ResponseSuccess, [string]>(postDeleteService, {
    ...option,
    manual: true,
  });
};

export const useGetDetailService = (option?: Options<ResponseDetailSuccess, any>) => {
  const getDetailService = async (id: string) => {
    const response: AxiosResponse<ResponseDetailSuccess> = await fetchAPI.request({
      url: `/v1.0/company/service-setting/${id}/detail`,
    });
    return response.data;
  };
  return useRequest<ResponseDetailSuccess, [string]>(getDetailService, {
    ...option,
    manual: true,
  });
};

export const useUpdateServiceSetting = (option?: Options<ResponseSuccess, any>) => {
  const updateServiceSetting = async (id: string, data: DataPostService) => {
    const response: AxiosResponse<ResponseSuccess> = await fetchAPI.request({
      url: `/v1.0/company/service-setting/${id}`,
      method: 'PUT',
      data,
    });
    return response.data;
  };
  return useRequest<ResponseSuccess, [string, DataPostService]>(updateServiceSetting, {
    ...option,
    manual: true,
  });
};
