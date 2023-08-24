import { v4 as uuidv4 } from 'uuid';
import { Field } from 'models/Field';
import { getAppCurrencySymbol } from 'utils/getAppCurrencySymbol';

const currency = getAppCurrencySymbol();

export const fieldsSearch: Field[] = [
  { id: uuidv4(), required: undefined, label: 'vehicle', type: 'text' },
  { id: uuidv4(), required: undefined, label: 'registrationId', type: 'text' },
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
    format: 'DD/MM/YYYY HH:mm',
    showTime: true,
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
    prefix: currency.currency,
    required: false,
  },
  {
    id: uuidv4(),
    label: 'extraFees',
    type: 'number',
    prefix: currency.symbol,
    required: false,
  },
];
