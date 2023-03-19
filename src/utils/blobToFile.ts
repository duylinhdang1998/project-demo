export const blobToFile = (blob: Blob, fileName: string): File => {
  return new File([blob], fileName, { lastModified: Date.now() });
};
