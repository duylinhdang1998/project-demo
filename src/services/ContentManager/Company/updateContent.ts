import { AxiosResponse } from 'axios';
import { Content } from 'services/models/Content';
import { ServiceException } from 'services/utils/ServiceException';
import fetchAPI from 'utils/fetchAPI';

interface ResponseSuccess {
  code: 0;
  data: Content;
}

interface ResponseFailure {
  code: 1000;
  timestamp: string;
  path: string;
  message: string;
}

export interface UpdateContent {
  data: Pick<Content, 'city' | 'email' | 'phone' | 'content' | 'footerText' | 'postalAddress' | 'zipCode'>;
}

export const updateContent = async ({ data }: UpdateContent) => {
  const response: AxiosResponse<ResponseSuccess | ResponseFailure> = await fetchAPI.request({
    method: 'PUT',
    url: '/v1.0/company/content-manager',
    data,
  });
  if (response.data.code === 0) {
    return response.data as ResponseSuccess;
  }
  const response_ = response as AxiosResponse<ResponseFailure>;
  throw new ServiceException(response_.data.message, { cause: response_.data });
};
