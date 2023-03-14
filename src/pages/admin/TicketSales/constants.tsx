import { Field, Option } from 'models/Field';
import { PaymentStatus } from 'models/PaymentStatus';
import { v4 as uuidv4 } from 'uuid';

const paymentsStatus: Option[] = [
  // FIXME: Fix label
  { key: uuidv4(), value: PaymentStatus.APPROVED, label: PaymentStatus.APPROVED },
  { key: uuidv4(), value: PaymentStatus.CREATED, label: PaymentStatus.CREATED },
  { key: uuidv4(), value: PaymentStatus.PENDING, label: PaymentStatus.PENDING },
  { key: uuidv4(), value: PaymentStatus.VOIDED, label: PaymentStatus.VOIDED },
];

export const fieldsSearch: Field[] = [
  { id: uuidv4(), label: 'departurePoint', type: 'departurePoint' },
  { id: uuidv4(), label: 'arrivalPoint', type: 'arrivalPoint' },
  { id: uuidv4(), label: 'order_date', type: 'datetime', showTime: true, format: 'MM/DD/YYYY - HH:mm' },
  { id: uuidv4(), label: 'payment_status', options: paymentsStatus, type: 'select', isClearable: true },
  { id: uuidv4(), label: 'order_id', type: 'text', placeholder: 'order_id' },
];

export const fieldsSearch2: Field[] = [
  { id: uuidv4(), label: 'departurePoint', type: 'departurePoint' },
  { id: uuidv4(), label: 'arrivalPoint', type: 'arrivalPoint' },
  { id: uuidv4(), label: 'order_date', type: 'datetime', showTime: true, format: 'MM/DD/YYYY - HH:mm' },
  { id: uuidv4(), label: 'order_id', type: 'text', placeholder: 'order_id' },
];
