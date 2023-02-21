import { AxiosResponse } from 'axios';
import { ResponseDetailSuccess, ResponseFailure } from 'services/models/Response';
import { Route } from 'services/models/Route';
import { ServiceException } from 'services/utils/ServiceException';
import fetchAPI from 'utils/fetchAPI';
import { momentToNumber } from 'utils/momentToNumber';

export type UpdateActiveDays = Pick<Route, 'routeCode' | 'dayActives'> & {
  startPeriod: number;
  endPeriod: number;
};

export const updateActiveDays = async (data: UpdateActiveDays) => {
  const response: AxiosResponse<ResponseDetailSuccess<Route> | ResponseFailure> = await fetchAPI.request({
    method: 'POST',
    url: '/v1.0/company/routes/days/actives',
    data: {
      ...data,
      startPeriod: momentToNumber(data.startPeriod),
      endPeriod: momentToNumber(data.endPeriod),
    } as UpdateActiveDays,
  });
  if (response.data.code === 0) {
    return response.data as ResponseDetailSuccess<Route>;
  }
  const response_ = response as AxiosResponse<ResponseFailure>;
  throw new ServiceException(response_.data.message, { cause: response_.data });
};
