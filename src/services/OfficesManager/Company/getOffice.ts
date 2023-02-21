import { AxiosResponse } from 'axios';
import { Office } from 'services/models/Office';
import { ResponseDetailSuccess } from 'services/models/Response';
import fetchAPI from 'utils/fetchAPI';

export interface GetOffice {
  id: Office['_id'];
}

export const getOffice = async ({ id }: GetOffice) => {
  const response: AxiosResponse<ResponseDetailSuccess<Office>> = await fetchAPI.request({
    url: `/v1.0/company/office-manager/${id}/detail`,
  });
  return response.data;
};
