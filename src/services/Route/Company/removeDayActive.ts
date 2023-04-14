import { AxiosResponse } from 'axios';
import { ResponseDetailSuccess, ResponseFailure } from 'services/models/Response';
import { Route } from 'services/models/Route';
import { ServiceException } from 'services/utils/ServiceException';
import fetchAPI from 'utils/fetchAPI';

type ResponseData = true;

export type RemoveDayActive = Pick<Route, 'routeCode'> & {
  dayoff: Route['dayoffs'][number];
};

export const removeDayActive = async (data: RemoveDayActive) => {
  const response: AxiosResponse<ResponseDetailSuccess<ResponseData> | ResponseFailure> = await fetchAPI.request({
    method: 'DELETE',
    url: '/v1.0/company/routes/days/particular',
    data: {
      ...data,
      dayoff: Number(data.dayoff),
    } as RemoveDayActive,
  });
  if (response.data.code === 0) {
    return response.data as ResponseDetailSuccess<ResponseData>;
  }
  const response_ = response as AxiosResponse<ResponseFailure>;
  throw new ServiceException(response_.data.message, response_.data);
};
