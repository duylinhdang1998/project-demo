import { AxiosResponse } from 'axios';
import { Passenger } from 'services/models/Passenger';
import { ResponseDetailSuccess } from 'services/models/Response';
import fetchAPI from 'utils/fetchAPI';

export interface GetPassenger {
  id: Passenger['_id'];
}
export const getPassenger = async ({ id }: GetPassenger) => {
  const response: AxiosResponse<ResponseDetailSuccess<Passenger>> = await fetchAPI.request({
    url: `/v1.0/company/passengers/${id}/detail`,
  });

  return response.data;
};
