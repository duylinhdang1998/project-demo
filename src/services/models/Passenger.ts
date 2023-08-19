import { TFunction } from 'i18next';
import { TicketSale } from './TicketSale';

export interface Passenger {
  _id: string;
  company: string;
  email: string;
  country: string;
  firstName: string;
  lastName: string;
  name: string;
  phone: string;
  status: 'BLOCK' | 'ACTIVE';
  createdAt: string;
  updatedAt: string;
  __v: number;
  orderCounts: number;
  orders: TicketSale[];
}

export const getPassengerStatusMappingToLabel = (t: TFunction): Record<Passenger['status'], string> => {
  return {
    ACTIVE: t('translation:ACTIVE'),
    BLOCK: t('translation:BLOCK'),
  };
};
