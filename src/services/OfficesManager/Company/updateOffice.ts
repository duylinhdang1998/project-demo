import { AxiosResponse } from 'axios';
import { Office } from 'services/models/Office';
import { ServiceException } from 'services/utils/ServiceException';
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

interface ResponseFailure {
  code: 1000;
  timestamp: string;
  path: string;
  message: string;
}

export const updateOffice = async ({ data, id }: UpdateOffice): Promise<ResponseSuccess> => {
  const response: AxiosResponse<ResponseSuccess | ResponseFailure> = await fetchAPI.request({
    method: 'PUT',
    url: `/v1.0/company/office-manager/${id}`,
    data,
  });
  if (response.data.code === 0) {
    return response.data as ResponseSuccess;
  }
  const response_ = response as AxiosResponse<ResponseFailure>;
  throw new ServiceException(response_.data.message, { cause: response_.data });
};
