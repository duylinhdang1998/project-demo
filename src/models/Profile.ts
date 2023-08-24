import { ImageResource } from 'services/models/Resource';

export interface CurrencyIF {
  currency: string;
  symbol: string;
}

export interface Profile {
  __v: number;
  _id: string;
  address: string;
  city: string;
  companyCode: string;
  country: string;
  createdAt: string;
  domain: string;
  email: string;
  logoImage: ImageResource;
  name: string;
  phone: string;
  profileImage: ImageResource;
  transportLicense: string;
  updatedAt: string;
  zipCode: string;
  currency: CurrencyIF;
}
