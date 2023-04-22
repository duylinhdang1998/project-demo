import { v4 as uuidv4 } from 'uuid';
import { Field, SorterCol } from 'models/Field';
import { PackageSale } from 'models/PackageSales';

export const fieldsSearch: Field[] = [
  { id: uuidv4(), label: 'destination', type: 'arrivalPoint' },
  { id: uuidv4(), label: 'from', type: 'text', placeholder: 'order_id' },
  { id: uuidv4(), label: 'recipient', type: 'text', placeholder: 'order_id' },
  { id: uuidv4(), label: 'orderId', type: 'text', placeholder: 'order_id' },
  { id: uuidv4(), label: 'departureTime', type: 'date_range', format: 'MM/DD/YYYY - HH:mm' },
];

export const agentFieldSearch: Field[] = [
  { id: uuidv4(), label: 'destination', type: 'select' },
  { id: uuidv4(), label: 'from', type: 'text', placeholder: 'from' },
  { id: uuidv4(), label: 'recipient', type: 'text', placeholder: 'recipient' },
  { id: uuidv4(), label: 'orderId', type: 'text', placeholder: 'order_id' },
];

export const keysFieldsSearch = ['destination', 'from', 'recipient', 'payment_status', 'order_id'] as const;

export interface SortOrder {
  [key: string]: SorterCol;
}

export const getTotal = (arr: PackageSale['merchandises'], key: string) => {
  return arr?.reduce((s, item) => {
    return (s += item[key]);
  }, 0);
};
