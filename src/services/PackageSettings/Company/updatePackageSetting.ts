import { AxiosResponse } from 'axios';
import { PackageSetting } from 'services/models/PackageSetting';
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

export const updatePackageSetting = async ({ data, id }: UpdatePackageSetting): Promise<ResponseSuccess> => {
  const response: AxiosResponse<ResponseSuccess> = await fetchAPI.request({
    method: 'PUT',
    url: `/v1.0/company/package-setting/${id}`,
    data,
  });
  return response.data;
};
