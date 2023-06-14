import { ImageResource, PDFResource } from 'services/models/Resource';

export const getNameOfResource = (resource: ImageResource | PDFResource | undefined | null) => {
  if (!resource) {
    return '';
  }
  const splited = resource.publicUrl?.split('/');
  return splited[splited.length - 1];
};
