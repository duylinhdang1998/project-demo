export interface Passenger {
  _id: string;
  company: string;
  email: string;
  country: string;
  firstName: string;
  lastName: string;
  phone: string;
  status: 'BLOCK' | 'ACTIVE';
  createdAt: string;
  updatedAt: string;
  __v: number;
  orderCounts: number;
  orders: []; // FIXME: Chưa có type
}
