import { AxiosResponse } from 'axios';
import { PDFResource } from 'services/models/Resource';
import { ResponseDetailSuccess, ResponseFailure } from 'services/models/Response';
import { ServiceException } from 'services/utils/ServiceException';
import fetchAPI from 'utils/fetchAPI';

interface UploadPDFResource {
  file: File;
}
export const uploadPDFResource = async ({ file }: UploadPDFResource) => {
  const formData = new FormData();
  formData.append('file', file);
  const response: AxiosResponse<ResponseDetailSuccess<PDFResource> | ResponseFailure> = await fetchAPI.request({
    method: 'POST',
    url: '/v1.0/resources/document',
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  if (response.data.code === 0) {
    return response.data as ResponseDetailSuccess<PDFResource>;
  }
  const response_ = response as AxiosResponse<ResponseFailure>;
  throw new ServiceException(response_.data.message, response_.data);
};
