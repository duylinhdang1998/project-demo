import { ImageResource, PDFResource } from 'services/models/Resource';

export const getNameOfResource = (resource: ImageResource | PDFResource | undefined | null) => {
  if (!resource || typeof resource !== 'object') {
    return '';
  }
  if ('filename' in resource) {
    return resource.filename;
  }
  const splited = resource.publicUrl?.split('/');
  if (splited) {
    return splited[splited.length - 1];
  }
  return '';
};
