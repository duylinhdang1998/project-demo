import { AxiosResponse } from 'axios';
import { PackageSetting } from 'services/models/PackageSetting';
import { ResponseDetailSuccess } from 'services/models/Response';
import fetchAPI from 'utils/fetchAPI';

export interface GetPackageSetting {
  id: PackageSetting['_id'];
}

export const getPackageSetting = async ({ id }: GetPackageSetting) => {
  const response: AxiosResponse<ResponseDetailSuccess<PackageSetting>> = await fetchAPI.request({
    url: `/v1.0/company/package-setting/${id}/detail`,
  });
  return response.data;
};
