import { AxiosResponse } from 'axios';
import { Route } from 'services/models/Route';
import fetchAPI from 'utils/fetchAPI';

export interface DeleteRoute {
  id: Route['_id'];
}

interface ResponseSuccess {
  code: number;
  data: {
    acknowledged: true;
    deletedCount: 1;
  };
}

export const deleteRoute = async ({ id }: DeleteRoute): Promise<ResponseSuccess> => {
  const response: AxiosResponse<ResponseSuccess> = await fetchAPI.request({
    method: 'DELETE',
    url: `/v1.0/company/routes/${id}`,
  });
  return response.data;
};
