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
  paymentId?: string;
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
  departurePoint?: string;
  arrivalPoint?: string;
  departureTime?: number;
}
