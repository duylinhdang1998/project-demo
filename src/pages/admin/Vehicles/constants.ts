import { Field, Option } from 'models/Field';
import { v4 as uuidv4 } from 'uuid';

const departureOptions: Option[] = [
  { key: 'paris', value: 'paris', label: 'Paris' },
  { key: 'london', value: 'london', label: 'London' },
  { key: 'berlin', value: 'berlin', label: 'Berlin' },
];

export const fieldsSearch: Field[] = [
  { id: uuidv4(), label: 'vehicle', options: departureOptions, type: 'select' },
  { id: uuidv4(), label: 'registration_id', type: 'text' },
  { id: uuidv4(), label: 'route_id', type: 'text' },
];

export const fieldsAdd: Field[] = [
  {
    id: uuidv4(),
    label: 'brand',
    type: 'text',
  },
  {
    id: uuidv4(),
    label: 'model',
    type: 'text',
  },
  {
    id: uuidv4(),
    label: 'registration_id',
    type: 'text',
  },
  {
    id: uuidv4(),
    label: 'eco_seats',
    type: 'number',
  },
  {
    id: uuidv4(),
    label: 'vip_seats',
    type: 'number',
  },
];

export const fieldsAddRight: Field[] = [
  {
    id: uuidv4(),
    label: 'services',
    type: 'checkbox',
    options: [
      { key: 'wifi', value: 'wifi', label: 'Wifi' },
      { key: 'tv', value: 'tv', label: 'TV' },
      { key: 'wc', value: 'wc', label: 'WC' },
    ],
  },
  {
    id: uuidv4(),
    label: 'merchandises',
    type: 'checkbox',
    options: [
      { key: 'colis', value: 'colis', label: 'Colis' },
      { key: 'velo', value: 'velo', label: 'Vélo' },
      { key: 'animal', value: 'animal', label: 'Animal' },
    ],
  },
  {
    id: uuidv4(),
    label: 'attach_photo',
    type: 'image',
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
