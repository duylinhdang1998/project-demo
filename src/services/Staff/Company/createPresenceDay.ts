import { AxiosResponse } from 'axios';
import { DayInWeek } from 'services/models/DayInWeek';
import { ResponseDetailSuccess, ResponseFailure } from 'services/models/Response';
import { Staff } from 'services/models/Staff';
import { ServiceException } from 'services/utils/ServiceException';
import fetchAPI from 'utils/fetchAPI';
import { momentToNumber } from 'utils/momentToNumber';

export interface CreatePresenceDay {
  staffId: Staff['_id'];
  presenceDay: Array<DayInWeek>;
  periodFrom: number;
  periodTo: number;
}

export const createPresenceDay = async (data: CreatePresenceDay) => {
  const response: AxiosResponse<ResponseDetailSuccess<Staff> | ResponseFailure> = await fetchAPI.request({
    method: 'POST',
    url: '/v1.0/company/staffs/presence',
    data: {
      ...data,
      periodFrom: momentToNumber(data.periodFrom),
      periodTo: momentToNumber(data.periodTo),
    } as CreatePresenceDay,
  });
  if (response.data.code === 0) {
    return response.data as ResponseDetailSuccess<Staff>;
  }
  const response_ = response as AxiosResponse<ResponseFailure>;
  throw new ServiceException(response_.data.message, { cause: response_.data });
};
