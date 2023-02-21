import { AxiosResponse } from 'axios';
import { ResponseDetailSuccess } from 'services/models/Response';
import { Route } from 'services/models/Route';
import fetchAPI from 'utils/fetchAPI';

export interface DeleteRoute {
  id: Route['_id'];
}

interface ResponseData {
  acknowledged: true;
  deletedCount: 1;
}

export const deleteRoute = async ({ id }: DeleteRoute): Promise<ResponseDetailSuccess<ResponseData>> => {
  const response: AxiosResponse<ResponseDetailSuccess<ResponseData>> = await fetchAPI.request({
    method: 'DELETE',
    url: `/v1.0/company/routes/${id}`,
  });
  return response.data;
};
