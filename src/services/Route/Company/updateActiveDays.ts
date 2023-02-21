import { AxiosResponse } from 'axios';
import { Route } from 'services/models/Route';
import { ServiceException } from 'services/utils/ServiceException';
import fetchAPI from 'utils/fetchAPI';
import { momentToNumber } from 'utils/momentToNumber';

interface ResponseSuccess {
  code: 0;
  data: Route;
}

interface ResponseFailure {
  code: 1000;
  timestamp: string;
  path: string;
  message: string;
}

export type UpdateActiveDays = Pick<Route, 'routeCode' | 'dayActives'> & {
  startPeriod: number;
  endPeriod: number;
};

export const updateActiveDays = async (data: UpdateActiveDays) => {
  const response: AxiosResponse<ResponseSuccess | ResponseFailure> = await fetchAPI.request({
    method: 'POST',
    url: '/v1.0/company/routes/days/actives',
    data: {
      ...data,
      startPeriod: momentToNumber(data.startPeriod),
      endPeriod: momentToNumber(data.endPeriod),
    } as UpdateActiveDays,
  });
  if (response.data.code === 0) {
    return response.data as ResponseSuccess;
  }
  const response_ = response as AxiosResponse<ResponseFailure>;
  throw new ServiceException(response_.data.message, { cause: response_.data });
};
