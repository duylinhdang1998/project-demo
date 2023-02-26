import { ImageResource } from 'services/models/Resource';

export interface Profile {
  address: string;
  city: string;
  companyCode: string;
  country: string;
  createdAt: string;
  domain: string;
  email: string;
  logoImage: ImageResource;
  name: string;
  profileImage: ImageResource;
  transportLicense: string;
  updatedAt: string;
  zipCode: string;
  __v: number;
  _id: string;
}
