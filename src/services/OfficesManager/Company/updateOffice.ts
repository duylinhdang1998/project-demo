import { AxiosResponse } from 'axios';
import { Office } from 'services/models/Office';
import { ResponseDetailSuccess, ResponseFailure } from 'services/models/Response';
import { ServiceException } from 'services/utils/ServiceException';
import fetchAPI from 'utils/fetchAPI';

export interface UpdateOffice {
  id: Office['_id'];
  data: Pick<Office, 'title' | 'address' | 'zipCode' | 'country' | 'city' | 'phone' | 'email'>;
}

interface ResponseData {
  acknowledged: boolean;
  modifiedCount: number;
  upsertedId: null;
  upsertedCount: number;
  matchedCount: number;
}

export const updateOffice = async ({ data, id }: UpdateOffice): Promise<ResponseDetailSuccess<ResponseData>> => {
  const response: AxiosResponse<ResponseDetailSuccess<ResponseData> | ResponseFailure> = await fetchAPI.request({
    method: 'PUT',
    url: `/v1.0/company/office-manager/${id}`,
    data,
  });
  if (response.data.code === 0) {
    return response.data as ResponseDetailSuccess<ResponseData>;
  }
  const response_ = response as AxiosResponse<ResponseFailure>;
  throw new ServiceException(response_.data.message, { cause: response_.data });
};
