import { PaymentStatus } from './PaymentStatus';

export interface PackageSale {
  _id: string;
  company: string;
  orderCode?: string;
  arrivalPoint?: string;
  departurePoint?: string;
  sender?: Recipent;
  totalPrice?: number;
  totalQuantity?: number;
  totalWeight?: number;
  email?: string;
  recipent: Recipent;
  merchandises?: Merchandise[];
  createdAt?: Date;
  updatedAt?: Date;
  __v?: number;
  paymentDetail?: PaymentDetailItem[];
}

interface PaymentDetailItem {
  paymentCode?: string;
  paymentStatus?: PaymentStatus;
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
