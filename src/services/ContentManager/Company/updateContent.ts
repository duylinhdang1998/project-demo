import { AxiosResponse } from 'axios';
import { Content } from 'services/models/Content';
import { ResponseDetailSuccess, ResponseFailure } from 'services/models/Response';
import { ServiceException } from 'services/utils/ServiceException';
import fetchAPI from 'utils/fetchAPI';

export interface UpdateContent {
  data: Pick<Content, 'content' | 'footerText' | 'sidebar'>;
}

export const updateContent = async ({ data }: UpdateContent) => {
  const response: AxiosResponse<ResponseDetailSuccess<Content> | ResponseFailure> = await fetchAPI.request({
    method: 'PUT',
    url: '/v1.0/company/content-manager',
    data,
  });
  if (response.data.code === 0) {
    return response.data as ResponseDetailSuccess<Content>;
  }
  const response_ = response as AxiosResponse<ResponseFailure>;
  throw new ServiceException(response_.data.message, response_.data);
};
