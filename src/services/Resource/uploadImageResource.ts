import { AxiosResponse } from 'axios';
import { ImageResource } from 'services/models/Resource';
import { ResponseDetailSuccess, ResponseFailure } from 'services/models/Response';
import { ServiceException } from 'services/utils/ServiceException';
import fetchAPI from 'utils/fetchAPI';

interface UploadImageResource {
  file: File;
}
export const uploadImageResource = async ({ file }: UploadImageResource) => {
  const formData = new FormData();
  formData.append('file', file);
  const response: AxiosResponse<ResponseDetailSuccess<ImageResource> | ResponseFailure> = await fetchAPI.request({
    method: 'POST',
    url: '/v1.0/resources/image',
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  if (response.data.code === 0) {
    return response.data as ResponseDetailSuccess<ImageResource>;
  }
  const response_ = response as AxiosResponse<ResponseFailure>;
  throw new ServiceException(response_.data.message, { cause: response_.data });
};
