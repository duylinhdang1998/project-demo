import { SubscriptionType } from './Subscription';

export interface CompaniesType {
  id?: string;
  companyCode?: string;
  name?: string;
  domain?: string;
  address?: string;
  zipCode?: string;
  city?: string;
  country?: string;
  email?: string;
  role?: string;
  createdAt?: Date;
  updatedAt?: Date;
  v?: number;
  companyID?: string;
  subscription?: Subscription;
}
export interface Subscription {
  id?: string;
  company?: string;
  endDate?: Date;
  subscriptionType?: SubscriptionType;
  startDate?: Date;
  updatedAt?: Date;
}
