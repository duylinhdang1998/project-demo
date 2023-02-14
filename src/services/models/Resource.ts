export interface ImageResource {
  publicUrl: string;
  thumbnail: string;
  thumbnail2x: string;
  size: number;
  mimetype: `image/${string}`;
  uploader: string;
  encoding: string;
  bucketName: 'images';
  state: string;
  _id: string;
  createdAt: string;
  updatedAt: string;
  __v: 0;
}
export interface PDFResource {
  publicUrl: string;
  size: number;
  mimetype: `application/pdf`;
  uploader: string;
  encoding: string;
  bucketName: 'documents';
  state: string;
  _id: string;
  createdAt: string;
  updatedAt: string;
  __v: 0;
}
