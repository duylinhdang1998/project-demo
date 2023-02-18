import { ImageResource } from './Resource';

export interface ServiceSetting {
  _id: string;
  company: string;
  title: string;
  icon: ImageResource;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
