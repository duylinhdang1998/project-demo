import { AxiosResponse } from 'axios';
import { Office } from 'services/models/Office';
import fetchAPI from 'utils/fetchAPI';

export interface UpdateOffice {
  id: Office['_id'];
  data: Pick<Office, 'title' | 'address' | 'zipCode' | 'country' | 'city' | 'phone' | 'email'>;
}

interface ResponseSuccess {
  code: number;
  data: {
    acknowledged: boolean;
    modifiedCount: number;
    upsertedId: null;
    upsertedCount: number;
    matchedCount: number;
  };
}

export const updateOffice = async ({ data, id }: UpdateOffice): Promise<ResponseSuccess> => {
  const response: AxiosResponse<ResponseSuccess> = await fetchAPI.request({
    method: 'PUT',
    url: `/v1.0/company/office-manager/${id}`,
    data,
  });
  return response.data;
};
