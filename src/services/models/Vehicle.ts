import { ImageResource } from './Resource';

export interface Vehicle {
  _id: string;
  company: string;
  brand: string;
  model: string;
  registrationId: string;
  ECOseats: number;
  VIPseats: number;
  services: string[]; // FIXME: Chưa có model "Service"
  merchandises: string[]; // FIXME: Chưa có model "Merchandise"
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
  attach: string; // FIXME: Chưa có model "Attach"
  createdAt: string;
  updatedAt: string;
  __v: number;
}
