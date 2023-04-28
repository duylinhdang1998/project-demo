import { EnumPaymentGateway } from 'services/models/PaymentGateway';
import { PaymentStatus } from './PaymentStatus';

export enum DeliveryStatus {
  PENDING = 'PENDING',
  DELIVERING = 'DELIVERING',
  DELIVERED = 'DELIVERED',
  CANCELED = 'CANCELED',
}

export enum OrderStatus {
  SUCCESS = 'SUCCESS',
  CANCELED = 'CANCELED',
}
export interface PackageSale {
  _id: string;
  company: string;
  orderCode: string;
  route: string;
  departurePoint: string;
  arrivalPoint: string;
  departureTime: number;
  sender: Recipent;
  email: string;
  recipent: Recipent;
  merchandises: Merchandise[];
  deliveryStatus: DeliveryStatus;
  createdAt: string;
  updatedAt: string;
  __v: number;
  paymentStatus: PaymentStatus;
  totalWeight: number;
  totalPrice: number;
  totalQuantity: number;
  paymentMethod: EnumPaymentGateway;
}

interface Merchandise {
  package?: Package;
  weight?: number;
  price?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

interface Package {
  _id?: string;
  company?: string;
  title?: string;
  description?: string;
  createdAt?: Date;
  updatedAt?: Date;
  __v?: number;
}

interface Recipent {
  firstName?: string;
  lastName?: string;
  mobile?: string;
  type?: string;
}
