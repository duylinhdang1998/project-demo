import { AxiosResponse } from 'axios';
import { PackageSetting } from 'services/models/PackageSetting';
import fetchAPI from 'utils/fetchAPI';

export interface DeletePackageSetting {
  id: PackageSetting['_id'];
}

interface ResponseSuccess {
  code: number;
  data: {
    acknowledged: true;
    deletedCount: 1;
  };
}

export const deletePackageSetting = async ({ id }: DeletePackageSetting): Promise<ResponseSuccess> => {
  const response: AxiosResponse<ResponseSuccess> = await fetchAPI.request({
    method: 'DELETE',
    url: `/v1.0/company/package-setting/${id}`,
  });
  return response.data;
};
