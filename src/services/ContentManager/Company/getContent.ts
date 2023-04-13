import { AxiosResponse } from 'axios';
import { Content } from 'services/models/Content';
import { ResponseDetailSuccess, ResponseFailure } from 'services/models/Response';
import { ServiceException } from 'services/utils/ServiceException';
import fetchAPI from 'utils/fetchAPI';

export interface GetContent {}
export const getContent = async (_: GetContent) => {
  const response: AxiosResponse<ResponseDetailSuccess<Content> | ResponseFailure> = await fetchAPI.request({
    url: 'v1.0/company/content-manager',
  });
  if (response.data.code === 0) {
    return response.data as ResponseDetailSuccess<Content>;
  }
  const response_ = response as AxiosResponse<ResponseFailure>;
  throw new ServiceException(response_.data.message, response_.data);
};
