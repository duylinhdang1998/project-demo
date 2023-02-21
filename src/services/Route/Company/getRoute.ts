import { AxiosResponse } from 'axios';
import { ResponseDetailSuccess } from 'services/models/Response';
import { Route } from 'services/models/Route';
import fetchAPI from 'utils/fetchAPI';

export interface GetRoute {
  id: Route['_id'];
}

export const getRoute = async ({ id }: GetRoute) => {
  const response: AxiosResponse<ResponseDetailSuccess<Route>> = await fetchAPI.request({
    url: `/v1.0/company/routes/${id}/detail`,
  });
  return response.data;
};
