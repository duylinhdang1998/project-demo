import { AxiosResponse } from 'axios';
import { PackageSetting } from 'services/models/PackageSetting';
import fetchAPI from 'utils/fetchAPI';

export interface GetPackageSetting {
  id: PackageSetting['_id'];
}

interface ResponseSuccess {
  code: number;
  data: PackageSetting;
}

export const getPackageSetting = async ({ id }: GetPackageSetting) => {
  const response: AxiosResponse<ResponseSuccess> = await fetchAPI.request({
    url: `/v1.0/company/package-setting/${id}/detail`,
  });
  return response.data;
};
