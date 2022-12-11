import { v4 as uuidv4 } from 'uuid';
import { Field, Option } from 'models/Field';

const departureOptions: Option[] = [
  { key: 'paris', value: 'paris', label: 'Paris' },
  { key: 'london', value: 'london', label: 'London' },
  { key: 'berlin', value: 'berlin', label: 'Berlin' },
];

const paymentsStatus: Option[] = [
  { key: 'paid', value: 'paid', label: 'Paid' },
  { key: 'not_paid', value: 'not_paid', label: 'Not Paid' },
];

export const fieldsSearch: Field[] = [
  { id: uuidv4(), label: 'destination', options: departureOptions, type: 'select' },
  { id: uuidv4(), label: 'from', type: 'text', placeholder: 'order_id' },
  { id: uuidv4(), label: 'recipient', type: 'text', placeholder: 'order_id' },
  { id: uuidv4(), label: 'payment_status', options: paymentsStatus, type: 'select' },
  { id: uuidv4(), label: 'orderId', type: 'text', placeholder: 'order_id' },
];

export const agentFieldSearch: Field[] = [
  { id: uuidv4(), label: 'destination', options: departureOptions, type: 'select' },
  { id: uuidv4(), label: 'from', type: 'text', placeholder: 'from' },
  { id: uuidv4(), label: 'recipient', type: 'text', placeholder: 'recipient' },
  { id: uuidv4(), label: 'orderId', type: 'text', placeholder: 'order_id' },
];

export const keysFieldsSearch = ['destination', 'from', 'recipient', 'payment_status', 'order_id'] as const;
