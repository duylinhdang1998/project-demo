import { AxiosResponse } from 'axios';
import { ResponseDetailSuccess, ResponseFailure } from 'services/models/Response';
import { Route } from 'services/models/Route';
import { ServiceException } from 'services/utils/ServiceException';
import fetchAPI from 'utils/fetchAPI';

type ResponseData = true;

export type ToggleDayActive = Pick<Route, 'routeCode'> & {
  dayoff: Route['dayoffs'][number];
  type: 'ADD' | 'REMOVE';
};

export const toggleDayActive = async (data: ToggleDayActive) => {
  const response: AxiosResponse<ResponseDetailSuccess<ResponseData> | ResponseFailure> = await fetchAPI.request({
    method: 'DELETE',
    url: '/v1.0/company/routes/days/particular',
    data: {
      ...data,
      dayoff: Number(data.dayoff),
    } as ToggleDayActive,
  });
  if (response.data.code === 0) {
    return response.data as ResponseDetailSuccess<ResponseData>;
  }
  const response_ = response as AxiosResponse<ResponseFailure>;
  throw new ServiceException(response_.data.message, response_.data);
};
