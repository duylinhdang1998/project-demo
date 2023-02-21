import { UserRole } from './UserRole';

export interface RbacCompany {
  _id: string;
  companyCode: string;
  email: string;
  role: UserRole;
  status: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
