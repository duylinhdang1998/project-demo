import { Field, Option } from 'models/Field';
import { v4 as uuidv4 } from 'uuid';

export const departureOptions: Option[] = [
  { key: 'paris', value: 'paris', label: 'Paris' },
  { key: 'london', value: 'london', label: 'London' },
  { key: 'berlin', value: 'berlin', label: 'Berlin' },
];

export const fieldsSearch: Field[] = [
  { id: uuidv4(), label: 'departures_point', options: departureOptions, type: 'select' },
  { id: uuidv4(), label: 'arrival_points', options: departureOptions, type: 'select' },
  { id: uuidv4(), label: 'departure_time', type: 'datetime' },
  { id: uuidv4(), label: 'vehicles_name', type: 'select', placeholder: 'vehicles_name', options: departureOptions },
];

export const fieldsStepOne: Field[] = [
  { id: uuidv4(), label: 'vehicles_name', type: 'select', placeholder: 'vehicles_name', options: departureOptions },
  { id: uuidv4(), label: 'departures_point', options: departureOptions, type: 'select' },
  { id: uuidv4(), label: 'arrival_points', options: departureOptions, type: 'select' },
  { id: uuidv4(), label: 'departure_time', type: 'datetime', showTime: true },
  { id: uuidv4(), label: 'arrival_time', type: 'datetime', showTime: true },
];

export const fieldsStepMulti: Field[] = [
  { id: uuidv4(), label: 'vehicles_name', type: 'select', placeholder: 'vehicles_name', options: departureOptions },
  { id: uuidv4(), label: 'departures_point', options: departureOptions, type: 'select' },
  { id: uuidv4(), label: 'departure_time', type: 'datetime', showTime: true },
];
