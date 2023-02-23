import { AxiosResponse } from 'axios';
import { Pagination, Searcher, Sorter } from 'services/@types/SearchParams';
import { ResponseSuccess } from 'services/models/Response';
import { VehicleEvent } from 'services/models/Vehicle';
import { getSearchParams } from 'services/utils/getSearchParams';
import { getSortParams } from 'services/utils/getSortParams';
import fetchAPI from 'utils/fetchAPI';

export interface GetVehicleEvents {
  page: Pagination;
  sorter: Sorter<VehicleEvent>;
  searcher: Searcher<VehicleEvent>;
  vehicleId: VehicleEvent['vehicle'];
}

export const RECORDS_PER_PAGE = 8;
export const getVehicleEvents = async ({ page, sorter, searcher, vehicleId }: GetVehicleEvents): Promise<ResponseSuccess<VehicleEvent>> => {
  const response: AxiosResponse<ResponseSuccess<VehicleEvent>> = await fetchAPI.request({
    url: '/v1.0/company/vehicle-events',
    params: {
      limit: RECORDS_PER_PAGE,
      offset: page * RECORDS_PER_PAGE,
      ...getSortParams(sorter),
      ...getSearchParams(searcher),
      'vehicle[eq]': vehicleId,
    },
  });
  return response.data;
};
