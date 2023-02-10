import { AxiosResponse } from 'axios';
import { PackageSetting } from 'services/models/PackageSetting';
import { ServiceException } from 'services/utils/ServiceException';
import fetchAPI from 'utils/fetchAPI';

export interface UpdatePackageSetting {
  id: PackageSetting['_id'];
  data: Pick<PackageSetting, 'title' | 'description'>;
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
  timestamp: '2023-02-07T13:24:03.044Z';
  path: '/v1.0/company/package-setting';
  message: 'An error occurred';
}

export const updatePackageSetting = async ({ data, id }: UpdatePackageSetting): Promise<ResponseSuccess> => {
  const response: AxiosResponse<ResponseSuccess | ResponseFailure> = await fetchAPI.request({
    method: 'PUT',
    url: `/v1.0/company/package-setting/${id}`,
    data,
  });
  if (response.data.code === 0) {
    return response.data as ResponseSuccess;
  }
  const response_ = response as AxiosResponse<ResponseFailure>;
  throw new ServiceException(response_.data.message, { cause: response_.data });
};
