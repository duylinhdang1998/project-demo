export interface Package {
  orderId?: string;
  destination?: string;
  from?: string;
  recipent?: string;
  qty?: string;
  weight?: number;
  price?: number;
  status?: string[];
}

export interface PackageSetting {
  id: string;
  title?: string;
  description?: string;
}
