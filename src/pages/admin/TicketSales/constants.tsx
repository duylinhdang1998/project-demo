import { FilterTicketProps } from 'components/FilterTicket/FilterTicket';
import { Option } from 'models/Field';
import { EPaymentStatus, PaymentStatusLabelMapping } from 'models/PaymentStatus';
import { v4 as uuidv4 } from 'uuid';
import { FormSearchValues } from './TicketSales';

const paymentsStatus: Option[] = [
  { key: uuidv4(), value: EPaymentStatus.APPROVED, label: PaymentStatusLabelMapping[EPaymentStatus.APPROVED] },
  { key: uuidv4(), value: EPaymentStatus.CREATED, label: PaymentStatusLabelMapping[EPaymentStatus.CREATED] },
  { key: uuidv4(), value: EPaymentStatus.PENDING, label: PaymentStatusLabelMapping[EPaymentStatus.PENDING] },
  { key: uuidv4(), value: EPaymentStatus.VOIDED, label: PaymentStatusLabelMapping[EPaymentStatus.VOIDED] },
];

export const fieldsSearch: FilterTicketProps<FormSearchValues>['fields'] = [
  { id: uuidv4(), required: undefined, label: 'departurePoint', type: 'departurePoint', numberColumn: 2.1 },
  { id: uuidv4(), required: undefined, label: 'arrivalPoint', type: 'arrivalPoint', numberColumn: 2.1 },
  { id: uuidv4(), required: undefined, label: 'departureTime', type: 'date_range', format: 'DD/MM/YYYY - HH:mm' },
  { id: uuidv4(), required: undefined, label: 'payment_status', options: paymentsStatus, type: 'select', isClearable: true, numberColumn: 1.9 },
  { id: uuidv4(), required: undefined, label: 'order_id', type: 'text', placeholder: 'order_id', numberColumn: 2.1 },
];
