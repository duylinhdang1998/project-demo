import { AxiosResponse } from 'axios';
import { Route } from 'services/models/Route';
import fetchAPI from 'utils/fetchAPI';

interface ResponseSuccess {
  code: 0;
  data: true;
}

export type RemoveDayActive = Pick<Route, 'routeCode'> & {
  dayoff: Route['dayoffs'][number];
};

export const removeDayActive = async (data: RemoveDayActive) => {
  const response: AxiosResponse<ResponseSuccess> = await fetchAPI.request({
    method: 'DELETE',
    url: '/v1.0/company/routes/days/particular',
    data: {
      ...data,
      dayoff: Number(data.dayoff),
    } as RemoveDayActive,
  });
  return response.data;
};
