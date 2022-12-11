import { Field, Option } from 'models/Field';
import { v4 as uuidv4 } from 'uuid';

const departureOptions: Option[] = [
  { key: 'paris', value: 'paris', label: 'Paris' },
  { key: 'london', value: 'london', label: 'London' },
  { key: 'berlin', value: 'berlin', label: 'Berlin' },
];
const paymentsStatus: Option[] = [
  { key: 'paid', value: 'paid', label: 'Paid' },
  { key: 'not_paid', value: 'not_paid', label: 'Not Paid' },
];

export const fields: Field[] = [
  { id: uuidv4(), label: 'departures_point', options: departureOptions, type: 'select' },
  { id: uuidv4(), label: 'arrival_points', options: departureOptions, type: 'select' },
  { id: uuidv4(), label: 'departure_time', type: 'datetime' },
];
