import { AxiosResponse } from 'axios';
import { RbacCompany } from 'services/models/RbacCompany';
import { ResponseFailure, ResponseDetailSuccess } from 'services/models/Response';
import { UserRole } from 'services/models/UserRole';
import { ServiceException } from 'services/utils/ServiceException';
import fetchAPI from 'utils/fetchAPI';

interface ResponseData {
  rbacCompany: RbacCompany;
  payload: {
    type: 'Bearer';
    rbacToken: string;
  };
}

export interface Login {
  email: string;
  password: string;
}

const ACCEPT_ROLES: UserRole[] = ['COMPANY_ADMIN', 'COMPANY_AGENT'];
export const login = async ({ email, password }: Login): Promise<ResponseDetailSuccess<ResponseData>> => {
  const response: AxiosResponse<ResponseDetailSuccess<ResponseData> | ResponseFailure> = await fetchAPI.request({
    method: 'POST',
    url: '/v1.0/auth/company/login',
    data: {
      email,
      password,
    },
  });

  if (response.data.code === 0) {
    const response_ = response.data as ResponseDetailSuccess<ResponseData>;
    if (ACCEPT_ROLES.includes(response_.data.rbacCompany.role)) {
      return response_;
    } else {
      const response_ = response as AxiosResponse<ResponseFailure>;
      throw new ServiceException(response_.data.message, { cause: response_.data });
    }
  }
  const response_ = response as AxiosResponse<ResponseFailure>;
  throw new ServiceException(response_.data.message, { cause: response_.data });
};
