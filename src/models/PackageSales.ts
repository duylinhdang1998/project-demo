import { PaymentStatus } from './PaymentStatus';

export interface PackageSale {
  _id?: string;
  company?: string;
  orderCode?: string;
  trip?: Trip;
  sender?: Recipent;
  email?: string;
  recipent?: Recipent;
  merchandises?: Merchandise[];
  createdAt?: Date;
  updatedAt?: Date;
  __v?: number;
  paymentId?: {
    _id?: string;
    paymentCode?: string;
    paymentStatus: PaymentStatus;
  };
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

interface Trip {
  departurePoint?: {
    _id?: string;
    name?: string;
    officialName?: string;
    code?: string;
  };
  arrivalPoint?: {
    _id?: string;
    name?: string;
    officialName?: string;
    code?: string;
  };
  departureTime?: number;
}
