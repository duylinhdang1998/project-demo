import { AxiosResponse } from 'axios';
import { Route } from 'services/models/Route';
import fetchAPI from 'utils/fetchAPI';

export interface GetRoute {
  id: Route['_id'];
}

interface ResponseSuccess {
  code: number;
  data: Route;
}

export const getRoute = async ({ id }: GetRoute) => {
  const response: AxiosResponse<ResponseSuccess> = await fetchAPI.request({
    url: `/v1.0/company/routes/${id}/detail`,
  });
  return response.data;
};
