import env from 'env';
import { ImageResource } from 'services/models/Resource';

export const getUrlOfResource = (resource: ImageResource) => {
  return `${env.apiEndPoint}/${resource.publicUrl}`;
};
