import { AxiosResponse } from 'axios';
import { Content } from 'services/models/Content';
import { ResponseDetailSuccess, ResponseFailure } from 'services/models/Response';
import { ServiceException } from 'services/utils/ServiceException';
import { isResponseError } from 'services/utils/isResponseError';
import fetchAPI from 'utils/fetchAPI';

export interface GetContent {}
export const getContent = async (_: GetContent) => {
  const response: AxiosResponse<ResponseDetailSuccess<Content> | ResponseFailure> = await fetchAPI.request({
    url: 'v1.0/company/content-manager',
  });
  if (isResponseError(response)) {
    throw new ServiceException(response.data.message, response.data);
  }
  return response.data as ResponseDetailSuccess<Content>;
};
