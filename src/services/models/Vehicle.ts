import { PackageSetting } from './PackageSetting';
import { ImageResource, PDFResource } from './Resource';
import { ServiceSetting } from './ServiceSetting';

export interface Vehicle {
  __v: number;
  _id: string;
  ECOseats: number;
  VIPseats: number;
  attach?: ImageResource;
  brand: string;
  company: string;
  createdAt: string;
  merchandises: PackageSetting[];
  model: string;
  registrationId: string;
  services: Array<Omit<ServiceSetting, 'icon'> & { icon: ServiceSetting['icon']['_id'] }>;
  updatedAt: string;
  vehicleEvents?: VehicleEvent[];
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
