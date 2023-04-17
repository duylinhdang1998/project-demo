import { PaymentStatus } from './PaymentStatus';

export type DeliveryStatus = 'unfulfilment' | 'schedule' | 'fulfilment';

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
  paymentDetail: PaymentDetailItem[];
  totalWeight: number;
  totalPrice: number;
  totalQuantity: number;
}

interface PaymentDetailItem {
  paymentCode: string;
  paymentStatus: PaymentStatus;
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
