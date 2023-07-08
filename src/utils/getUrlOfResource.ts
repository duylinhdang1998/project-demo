import env from 'env';
import { ImageResource, PDFResource } from 'services/models/Resource';
import placeholder from 'assets/images/placeholder-image.jpg';

export const getUrlOfResource = (resource: ImageResource | PDFResource | undefined | null) => {
  if (!resource) {
    return placeholder;
  }
  return `${env.apiEndPoint}/${resource.publicUrl}`;
};

export const getUrlImage = (id: string) => {
  return `${env.apiEndPoint}/images/origin/${id}.webp`;
};
