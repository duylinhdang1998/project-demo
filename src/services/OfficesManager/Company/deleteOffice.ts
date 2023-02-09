import { AxiosResponse } from 'axios';
import { Office } from 'services/models/Office';
import fetchAPI from 'utils/fetchAPI';

export interface DeleteOffice {
  id: Office['_id'];
}

interface ResponseSuccess {
  code: number;
  data: {
    acknowledged: true;
    deletedCount: 1;
  };
}

export const deleteOffice = async ({ id }: DeleteOffice): Promise<ResponseSuccess> => {
  const response: AxiosResponse<ResponseSuccess> = await fetchAPI.request({
    method: 'DELETE',
    url: `/v1.0/company/office-manager/${id}`,
  });
  return response.data;
};
