import { AxiosResponse } from 'axios';
import { Staff } from 'services/models/Staff';
import { ResponseDetailSuccess, ResponseFailure } from 'services/models/Response';
import { ServiceException } from 'services/utils/ServiceException';
import fetchAPI from 'utils/fetchAPI';

export interface DeleteStaff {
  id: Staff['_id'];
}

interface ResponseData {
  acknowledged: true;
  deletedCount: 1;
}

export const deleteStaff = async ({ id }: DeleteStaff): Promise<ResponseDetailSuccess<ResponseData>> => {
  const response: AxiosResponse<ResponseDetailSuccess<ResponseData> | ResponseFailure> = await fetchAPI.request({
    method: 'DELETE',
    url: `/v1.0/company/staff/${id}`,
  });
  if (response.data.code === 0) {
    return response.data as ResponseDetailSuccess<ResponseData>;
  }
  const response_ = response as AxiosResponse<ResponseFailure>;
  throw new ServiceException(response_.data.message, { cause: response_.data });
};
