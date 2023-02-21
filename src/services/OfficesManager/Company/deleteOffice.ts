import { AxiosResponse } from 'axios';
import { Office } from 'services/models/Office';
import { ResponseDetailSuccess } from 'services/models/Response';
import fetchAPI from 'utils/fetchAPI';

export interface DeleteOffice {
  id: Office['_id'];
}

interface ResponseData {
  acknowledged: true;
  deletedCount: 1;
}

export const deleteOffice = async ({ id }: DeleteOffice): Promise<ResponseDetailSuccess<ResponseData>> => {
  const response: AxiosResponse<ResponseDetailSuccess<ResponseData>> = await fetchAPI.request({
    method: 'DELETE',
    url: `/v1.0/company/office-manager/${id}`,
  });
  return response.data;
};
