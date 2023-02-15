import { v4 as uuidv4 } from 'uuid';
import { Field, Option } from 'models/Field';

const departureOptions: Option[] = [
  { key: 'paris', value: 'paris', label: 'Paris' },
  { key: 'london', value: 'london', label: 'London' },
  { key: 'berlin', value: 'berlin', label: 'Berlin' },
];

export const fieldsSearch: Field[] = [
  { id: uuidv4(), label: 'vehicle', options: departureOptions, type: 'select' },
  { id: uuidv4(), label: 'registrationId', type: 'text' },
  { id: uuidv4(), label: 'routeId', type: 'text' },
];

export const fieldsAdd: Field[] = [
  {
    id: uuidv4(),
    label: 'brand',
    type: 'text',
    required: true,
  },
  {
    id: uuidv4(),
    label: 'model',
    type: 'text',
    required: true,
  },
  {
    id: uuidv4(),
    label: 'registrationId',
    type: 'text',
    required: true,
  },
  {
    id: uuidv4(),
    label: 'ECOseats',
    type: 'number',
    required: true,
  },
  {
    id: uuidv4(),
    label: 'VIPseats',
    type: 'number',
    required: true,
  },
];

export const fieldsAddEvent: Field[] = [
  {
    id: uuidv4(),
    label: 'reminder_date',
    type: 'datetime',
  },
  {
    id: uuidv4(),
    label: 'total_kilometer',
    type: 'number',
  },
  {
    id: uuidv4(),
    label: 'fuel_fees',
    type: 'number',
    prefix: '$',
  },
  {
    id: uuidv4(),
    label: 'extra_fees',
    type: 'number',
    prefix: '$',
  },
];
