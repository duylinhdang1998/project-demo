import env from 'env';
import { ImageResource, PDFResource } from 'services/models/Resource';

export const getUrlOfResource = (resource: ImageResource | PDFResource) => {
  return `${env.apiEndPoint}/${resource.publicUrl}`;
};
