import { AxiosResponse } from 'axios';
import { Destination } from 'services/models/Destination';
import { ParamsSettings, ResponseSuccess } from 'services/models/Response';
import { getMaxLimit } from 'services/utils/getMaxLimit';
import { getMinOffset } from 'services/utils/getMinOffset';
import { getSearchParams } from 'services/utils/getSearchParams';
import { getSortParams } from 'services/utils/getSortParams';
import fetchAPI from 'utils/fetchAPI';

const RECORDS_PER_PAGE = 10;

interface GetListDestinationsParams extends ParamsSettings<Destination> {
  isGetAll?: boolean;
}

export const getListDestinations = async ({ page, sorter, searcher, isGetAll }: GetListDestinationsParams): Promise<ResponseSuccess<Destination>> => {
  const response: AxiosResponse<ResponseSuccess<Destination>> = await fetchAPI.request({
    url: '/v1.0/company/destinations',
    params: {
      limit: isGetAll ? getMaxLimit() : RECORDS_PER_PAGE,
      offset: isGetAll ? getMinOffset() : page * RECORDS_PER_PAGE,
      ...getSortParams(sorter, !isGetAll),
      ...(isGetAll ? {} : getSearchParams(searcher)),
    },
  });
  return response.data;
};
