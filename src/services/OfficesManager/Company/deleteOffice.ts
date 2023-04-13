import { AxiosResponse } from 'axios';
import { Office } from 'services/models/Office';
import { ResponseDetailSuccess, ResponseFailure } from 'services/models/Response';
import { ServiceException } from 'services/utils/ServiceException';
import fetchAPI from 'utils/fetchAPI';

export interface DeleteOffice {
  id: Office['_id'];
}

interface ResponseData {
  acknowledged: true;
  deletedCount: 1;
}

export const deleteOffice = async ({ id }: DeleteOffice): Promise<ResponseDetailSuccess<ResponseData>> => {
  const response: AxiosResponse<ResponseDetailSuccess<ResponseData> | ResponseFailure> = await fetchAPI.request({
    method: 'DELETE',
    url: `/v1.0/company/office-manager/${id}`,
  });
  if (response.data.code === 0) {
    return response.data as ResponseDetailSuccess<ResponseData>;
  }
  const response_ = response as AxiosResponse<ResponseFailure>;
  throw new ServiceException(response_.data.message, response_.data);
};
