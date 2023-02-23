import { v4 as uuidv4 } from 'uuid';
import { Field, Option } from 'models/Field';
import { PaymentStatus } from 'models/PaymentStatus';

const departureOptions: Option[] = [
  { key: 'paris', value: 'paris', label: 'Paris' },
  { key: 'london', value: 'london', label: 'London' },
  { key: 'berlin', value: 'berlin', label: 'Berlin' },
];

const paymentsStatus: Option[] = [
  { key: 'pending', value: 'pending', label: PaymentStatus.PENDING },
  { key: 'approved', value: 'approved', label: PaymentStatus.APPROVED },
  { key: 'created', value: 'created', label: PaymentStatus.CREATED },
  { key: 'voided', value: 'voided', label: PaymentStatus.VOIDED },
];

export const fieldsSearch: Field[] = [
  { id: uuidv4(), label: 'destination', options: departureOptions, type: 'country' },
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
