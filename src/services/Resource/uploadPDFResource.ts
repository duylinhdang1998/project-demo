import { AxiosResponse } from 'axios';
import { PDFResource } from 'services/models/Resource';
import { ServiceException } from 'services/utils/ServiceException';
import fetchAPI from 'utils/fetchAPI';

interface ResponseSuccess {
  code: 0;
  data: PDFResource;
}

interface ResponseFailure {
  code: 1000;
  timestamp: string;
  path: string;
  message: string;
}

interface UploadPDFResource {
  file: File;
}
export const uploadPDFResource = async ({ file }: UploadPDFResource) => {
  const response: AxiosResponse<ResponseSuccess | ResponseFailure> = await fetchAPI.request({
    method: 'POST',
    url: '/v1.0/resources/document',
    data: { file },
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  if (response.data.code === 0) {
    return response.data as ResponseSuccess;
  }
  const response_ = response as AxiosResponse<ResponseFailure>;
  throw new ServiceException(response_.data.message, { cause: response_.data });
};
