import { AxiosResponse } from 'axios';
import { Office } from 'services/models/Office';
import fetchAPI from 'utils/fetchAPI';

export interface GetOffice {
  id: Office['_id'];
}

interface ResponseSuccess {
  code: number;
  data: Office;
}

export const getOffice = async ({ id }: GetOffice) => {
  const response: AxiosResponse<ResponseSuccess> = await fetchAPI.request({
    url: `/v1.0/company/office-manager/${id}/detail`,
  });
  return response.data;
};