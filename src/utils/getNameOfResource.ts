import { ImageResource, PDFResource } from 'services/models/Resource';

export const getNameOfResource = (resource: ImageResource | PDFResource | undefined | null) => {
  if (!resource) {
    return '';
  }
  if ('filename' in resource) {
    return resource.filename;
  }
  const splited = resource.publicUrl?.split('/');
  return splited[splited.length - 1];
};
