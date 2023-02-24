import { useRequest } from 'ahooks';
import { AxiosResponse } from 'axios';
import fetchAPI from 'utils/fetchAPI';
import { Options } from 'ahooks/lib/useRequest/src/types';

interface ChangePasswordData {
  currentPassword: string;
  newPassword: string;
}

interface ResponseChangePassword {
  code: number;
}

export const useChangePassWord = (option?: Options<ResponseChangePassword, any>) => {
  const changePassword = async (data: ChangePasswordData) => {
    const response: AxiosResponse<ResponseChangePassword> = await fetchAPI.request({
      url: '/v1.0/company/rbac/change-password',
      method: 'post',
      data,
    });
    return response.data;
  };
  return useRequest<ResponseChangePassword, [ChangePasswordData]>(changePassword, {
    manual: true,
    ...option,
  });
};
