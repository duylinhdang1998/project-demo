import { AxiosResponse } from 'axios';
import { Content } from 'services/models/Content';
import fetchAPI from 'utils/fetchAPI';

interface ResponseSuccess {
  code: 0;
  data: Content;
}

export interface GetContent {}
export const getContent = async (_: GetContent) => {
  const response: AxiosResponse<ResponseSuccess> = await fetchAPI.request({
    url: 'v1.0/company/content-manager',
  });
  return response.data;
};
