import { useRequest } from 'ahooks';
import { AxiosResponse } from 'axios';
import { CompaniesType } from 'services/models/Companies';
import { ParamsSettings, ResponseSuccess } from 'services/models/Response';
import { getSearchParams } from 'services/utils/getSearchParams';
import { getSortParams } from 'services/utils/getSortParams';
import fetchAPI from 'utils/fetchAPI';

interface GetListCompaniesParams extends ParamsSettings<CompaniesType> {
  isGetAll?: boolean;
}

const RECORDS_PER_PAGE = 10;

export const useGetListCompanies = () => {
  const getListCompanies = async ({ page, sorter, searcher }: ParamsSettings<CompaniesType>): Promise<ResponseSuccess<CompaniesType>> => {
    const response: AxiosResponse<ResponseSuccess<CompaniesType>> = await fetchAPI.request({
      url: '/v1.0/company/manages',
      params: {
        limit: RECORDS_PER_PAGE,
        offset: page * RECORDS_PER_PAGE,
        ...getSortParams(sorter),
        ...getSearchParams(searcher),
      },
    });
    return response.data;
  };

  return useRequest<ResponseSuccess<CompaniesType>, [ParamsSettings<CompaniesType>]>(getListCompanies, {
    manual: true,
  });
};
