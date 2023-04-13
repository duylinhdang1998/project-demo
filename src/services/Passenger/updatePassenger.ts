import { AxiosResponse } from 'axios';
import { Passenger } from 'services/models/Passenger';
import { ResponseDetailSuccess, ResponseFailure } from 'services/models/Response';
import { ServiceException } from 'services/utils/ServiceException';
import fetchAPI from 'utils/fetchAPI';

interface ResponseData {
  acknowledged: true;
  modifiedCount: 0;
  upsertedId: null;
  upsertedCount: 0;
  matchedCount: 0;
}

export interface UpdatePassenger {
  data: Pick<Passenger, 'country' | 'firstName' | 'lastName' | 'phone'>;
  id: Passenger['_id'];
}
export const updatePassenger = async ({ data, id }: UpdatePassenger) => {
  const response: AxiosResponse<ResponseDetailSuccess<ResponseData> | ResponseFailure> = await fetchAPI.request({
    method: 'PUT',
    url: `/v1.0/company/passenger/${id}`,
    data,
  });
  if (response.data.code === 0) {
    return response.data as ResponseDetailSuccess<ResponseData>;
  }
  const response_ = response as AxiosResponse<ResponseFailure>;
  throw new ServiceException(response_.data.message, response_.data);
};
