import { AxiosResponse } from "axios";
import { ServiceException } from "services/utils/ServiceException";
import fetchAPI from "utils/fetchAPI";

interface Login {
  email: string;
  password: string;
}

interface ResponseSuccess {
  code: number;
  data: {
    rbacCompany: {
      _id: string;
      companyCode: string;
      email: string;
      role: string; // FIXME: ENUM chưa có
      status: string; // FIXME: ENUM chưa có
      createdAt: string;
      updatedAt: string;
      __v: number;
    };
    payload: {
      type: "Bearer"; // FIXME: ENUM chưa có
      rbacToken: string;
    };
  };
}

interface ResponseFailure {
  code: 2201;
  timestamp: "2023-02-07T00:45:57.271Z";
  path: "/v1.0/auth/company/login";
  message: "An error occurred";
}

export const login = async (_: Login): Promise<ResponseSuccess> => {
  const response: AxiosResponse<ResponseSuccess | ResponseFailure> = await fetchAPI.request({
    method: "POST",
    url: "/v1.0/auth/company/login",
    data: {
      email: "alibaba.transport@gmail.com",
      password: "12345678",
    },
  });

  if (response.data.code === 0) {
    return response.data as ResponseSuccess;
  }
  const response_ = response as AxiosResponse<ResponseFailure>;
  throw new ServiceException(response_.data.message, { cause: response_.data });
};
