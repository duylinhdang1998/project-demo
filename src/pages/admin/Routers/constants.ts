import { v4 as uuidv4 } from 'uuid';
import { Field, Option } from 'models/Field';

export const departureOptions: Option[] = [
  { key: 'paris', value: 'paris', label: 'Paris' },
  { key: 'london', value: 'london', label: 'London' },
  { key: 'berlin', value: 'berlin', label: 'Berlin' },
];

export const fieldsSearch: Field[] = [
  { id: uuidv4(), label: 'departurePoint', options: departureOptions, type: 'select' },
  { id: uuidv4(), label: 'arrivalPoint', options: departureOptions, type: 'select' },
  { id: uuidv4(), label: 'departureTime', type: 'datetime', picker: 'time', format: 'HH:mm' },
  { id: uuidv4(), label: 'vehicle', type: 'select', placeholder: 'vehicle', options: departureOptions },
];

export const fieldsStepOne: Field[] = [
  { id: uuidv4(), label: 'departurePoint', options: departureOptions, type: 'select', required: true },
  { id: uuidv4(), label: 'departureTime', type: 'datetime', showTime: true, required: true, picker: 'time', format: 'HH:mm' },
  { id: uuidv4(), label: 'arrivalPoint', options: departureOptions, type: 'select', required: true },
  { id: uuidv4(), label: 'arrivalDuration', type: 'number', showTime: true, required: true },
];

export const fieldsStepMulti: Field[] = [
  { id: uuidv4(), label: 'departurePoint', options: departureOptions, type: 'select', required: true },
  { id: uuidv4(), label: 'departureTime', type: 'datetime', showTime: true, required: true, picker: 'time', format: 'HH:mm' },
];
