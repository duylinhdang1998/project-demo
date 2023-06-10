import { AxiosResponse } from 'axios';
import { ResponseDetailSuccess, ResponseFailure } from 'services/models/Response';
import { Route } from 'services/models/Route';
import { ServiceException } from 'services/utils/ServiceException';
import fetchAPI from 'utils/fetchAPI';
import { uniqArrayTimestampWithDayInYearNSetHours12 } from 'utils/handleTimestampWithDayInYear';

export type UpdateActiveDays = Pick<Route, 'routeCode' | 'dayActives' | 'startPeriod' | 'endPeriod'>;

export const updateActiveDays = async (data: UpdateActiveDays): Promise<ResponseDetailSuccess<Route>> => {
  const response: AxiosResponse<ResponseDetailSuccess<Route> | ResponseFailure> = await fetchAPI.request({
    method: 'POST',
    url: '/v1.0/company/routes/days/actives',
    data,
  });
  if (response.data.code === 0) {
    const data = response.data as ResponseDetailSuccess<Route>;
    return {
      ...data,
      data: {
        ...data.data,
        dayoffs: uniqArrayTimestampWithDayInYearNSetHours12(data.data.dayoffs),
        particularDays: uniqArrayTimestampWithDayInYearNSetHours12(data.data.particularDays),
      },
    } as ResponseDetailSuccess<Route>;
  }
  const response_ = response as AxiosResponse<ResponseFailure>;
  throw new ServiceException(response_.data.message, response_.data);
};
