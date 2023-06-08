import { AxiosResponse } from 'axios';
import { ResponseDetailSuccess, ResponseFailure } from 'services/models/Response';
import { Staff } from 'services/models/Staff';
import { ServiceException } from 'services/utils/ServiceException';
import fetchAPI from 'utils/fetchAPI';

interface ResponseData {
  acknowledged: true;
  modifiedCount: 1;
  upsertedId: null;
  upsertedCount: 0;
  matchedCount: 1;
}

export interface UpdateStaffInfo {
  data: Pick<Staff, 'attach' | 'lastName' | 'firstName' | 'phone'>;
  staffId: Staff['_id'];
}
export const updateStaffInfo = async ({ data, staffId }: UpdateStaffInfo) => {
  const response: AxiosResponse<ResponseDetailSuccess<ResponseData> | ResponseFailure> = await fetchAPI.request({
    method: 'PUT',
    url: `/v1.0/company/staffs/information`,
    data: {
      ...data,
      staffId,
      attach: data.attach?._id,
    },
  });
  if (response.data.code === 0) {
    return response.data as ResponseDetailSuccess<ResponseData>;
  }
  const response_ = response as AxiosResponse<ResponseFailure>;
  throw new ServiceException(response_.data.message, response_.data);
};
