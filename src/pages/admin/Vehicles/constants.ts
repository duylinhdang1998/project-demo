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
    label: 'reminderDate',
    type: 'datetime',
    required: true,
  },
  {
    id: uuidv4(),
    label: 'totalKilometers',
    type: 'number',
    required: true,
  },
  {
    id: uuidv4(),
    label: 'fuelFees',
    type: 'number',
    prefix: '$',
    required: true,
  },
  {
    id: uuidv4(),
    label: 'extraFees',
    type: 'number',
    prefix: '$',
    required: true,
  },
];
