import { AxiosResponse } from 'axios';
import { PackageSetting } from 'services/models/PackageSetting';
import { ResponseDetailSuccess } from 'services/models/Response';
import fetchAPI from 'utils/fetchAPI';

interface ResponseData {
  acknowledged: true;
  deletedCount: 1;
}

export interface DeletePackageSetting {
  id: PackageSetting['_id'];
}

export const deletePackageSetting = async ({ id }: DeletePackageSetting): Promise<ResponseDetailSuccess<ResponseData>> => {
  const response: AxiosResponse<ResponseDetailSuccess<ResponseData>> = await fetchAPI.request({
    method: 'DELETE',
    url: `/v1.0/company/package-setting/${id}`,
  });
  return response.data;
};
