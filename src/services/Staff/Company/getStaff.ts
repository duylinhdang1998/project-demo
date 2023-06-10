import { AxiosResponse } from 'axios';
import { ResponseDetailSuccess } from 'services/models/Response';
import { Staff } from 'services/models/Staff';
import fetchAPI from 'utils/fetchAPI';
import { uniqArrayTimestampWithDayInYearNSetHours12 } from 'utils/handleTimestampWithDayInYear';

export interface GetStaff {
  id: Staff['_id'];
}

export const getStaff = async ({ id }: GetStaff): Promise<ResponseDetailSuccess<Staff>> => {
  const response: AxiosResponse<ResponseDetailSuccess<Staff>> = await fetchAPI.request({
    url: `/v1.0/company/staffs/${id}/detail`,
  });
  return {
    ...response.data,
    data: {
      ...response.data.data,
      dayOff: uniqArrayTimestampWithDayInYearNSetHours12(response.data.data.dayOff),
      dayExceptions: uniqArrayTimestampWithDayInYearNSetHours12(response.data.data.dayExceptions),
    },
  };
};
