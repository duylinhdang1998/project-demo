import { AxiosResponse } from 'axios';
import { Content } from 'services/models/Content';
import { ResponseDetailSuccess } from 'services/models/Response';
import fetchAPI from 'utils/fetchAPI';

export interface GetContent {}
export const getContent = async (_: GetContent) => {
  const response: AxiosResponse<ResponseDetailSuccess<Content>> = await fetchAPI.request({
    url: 'v1.0/company/content-manager',
  });
  return response.data;
};
