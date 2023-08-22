import { AxiosResponse } from 'axios';
import { Content } from 'services/models/Content';
import { ResponseDetailSuccess, ResponseFailure } from 'services/models/Response';
import { ServiceException } from 'services/utils/ServiceException';
import { isResponseError } from 'services/utils/isResponseError';
import fetchAPI from 'utils/fetchAPI';

export interface UpdateContent {
  data: Pick<Content, 'content' | 'footerText' | 'sidebar' | 'title'> & { backGround: string };
}

export const updateContent = async ({ data }: UpdateContent) => {
  const response: AxiosResponse<ResponseDetailSuccess<Content> | ResponseFailure> = await fetchAPI.request({
    method: 'PUT',
    url: '/v1.0/company/content-manager',
    data,
  });

  if (isResponseError(response)) {
    throw new ServiceException(response.data.message, response.data);
  }
  return response.data as ResponseDetailSuccess<Content>;
};
