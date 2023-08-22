import { ImageResource } from './Resource';

export interface Content {
  _id: string;
  company: string;
  __v: number;
  city: string;
  title: string;
  backGround: ImageResource;
  content: string;
  createdAt: string;
  email?: string;
  footerText: string;
  phone?: string;
  postalAddress?: string;
  updatedAt: string;
  zipCode?: string;
  sidebar?: string;
}
