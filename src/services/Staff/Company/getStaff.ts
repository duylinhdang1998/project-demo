import { AxiosResponse } from 'axios';
import { ResponseDetailSuccess } from 'services/models/Response';
import { Staff } from 'services/models/Staff';
import fetchAPI from 'utils/fetchAPI';

export interface GetStaff {
  id: Staff['_id'];
}

export const getStaff = async ({ id }: GetStaff) => {
  const response: AxiosResponse<ResponseDetailSuccess<Staff>> = await fetchAPI.request({
    url: `/v1.0/company/staffs/${id}/detail`,
  });
  return response.data;
};
