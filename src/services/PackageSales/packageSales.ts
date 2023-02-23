import { useRequest } from 'ahooks';
import { Options } from 'ahooks/lib/useRequest/src/types';
import { AxiosResponse } from 'axios';
import { Country } from 'models/Country';
import { PackageSale } from 'models/PackageSales';
import { ParamsSettings, ResponseSuccess } from 'services/models/Response';
import { getSearchParams } from 'services/utils/getSearchParams';
import { getSortParams } from 'services/utils/getSortParams';
import fetchAPI from 'utils/fetchAPI';

const RECORDS_PER_PAGE = 10;

export const useGetListPackageSales = (option?: Options<ResponseSuccess<PackageSale>, any>) => {
  const getListPackageSales = async ({ page, sorter, searcher }: ParamsSettings<PackageSale>): Promise<ResponseSuccess<PackageSale>> => {
    const response: AxiosResponse<ResponseSuccess<PackageSale>> = await fetchAPI.request({
      url: '/v1.0/company/package-sales',
      params: {
        limit: RECORDS_PER_PAGE,
        offset: page * RECORDS_PER_PAGE,
        ...getSortParams(sorter),
        ...getSearchParams(searcher),
      },
    });
    return response.data;
  };
  return useRequest(getListPackageSales, {
    ...option,
    manual: true,
  });
};

export const useGetCountryList = () => {
  const getCountryList = async (): Promise<ResponseSuccess<Country>> => {
    const response: AxiosResponse<ResponseSuccess<Country>> = await fetchAPI.request({
      url: '/v1.0/countries',
      params: {
        limit: 500,
        offset: 0,
      },
    });
    return response.data;
  };
  return useRequest(getCountryList);
};
