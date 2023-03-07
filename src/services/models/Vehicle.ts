import { PackageSetting } from './PackageSetting';
import { ImageResource, PDFResource } from './Resource';
import { ServiceSetting } from './ServiceSetting';

export interface Vehicle {
  _id: string;
  company: string;
  brand: string;
  model: string;
  registrationId: string;
  ECOseats: number;
  VIPseats: number;
  services: Array<Omit<ServiceSetting, 'icon'> & { icon: ServiceSetting['icon']['_id'] }>;
  merchandises: PackageSetting[];
  attach: ImageResource;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface VehicleEvent {
  _id: string;
  company: string;
  reminderDate: number;
  fuelFees: number;
  extraFees: number;
  totalKilometers: number;
  description: string;
  attach: PDFResource;
  createdAt: string;
  updatedAt: string;
  vehicle: Vehicle['_id'];
  __v: number;
}
