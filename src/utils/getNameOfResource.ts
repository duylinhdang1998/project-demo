import { ImageResource, PDFResource } from 'services/models/Resource';

export const getNameOfResource = (resource: ImageResource | PDFResource) => {
  const splited = resource.publicUrl.split('/');
  return splited[splited.length - 1];
};
