import { AxiosResponse } from 'axios';
import { Passenger } from 'services/models/Passenger';
import { ResponseDetailSuccess, ResponseFailure } from 'services/models/Response';
import { ServiceException } from 'services/utils/ServiceException';
import fetchAPI from 'utils/fetchAPI';

export interface GetPassenger {
  id: Passenger['_id'];
}
export const getPassenger = async ({ id }: GetPassenger) => {
  const response: AxiosResponse<ResponseDetailSuccess<Passenger> | ResponseFailure> = await fetchAPI.request({
    url: `/v1.0/company/passengers/${id}/detail`,
  });
  if (response.data.code === 0) {
    return response.data as ResponseDetailSuccess<Passenger>;
  }
  const response_ = response as AxiosResponse<ResponseFailure>;
  throw new ServiceException(response_.data.message, response_.data);
};
