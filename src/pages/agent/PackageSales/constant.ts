import { v4 as uuidv4 } from 'uuid';
import { Field } from 'models/Field';

export const fields1: Field[] = [
  { id: uuidv4(), label: 'departures_point', type: 'departurePoint' },
  { id: uuidv4(), label: 'arrival_points', type: 'arrivalPoint' },
  { id: uuidv4(), label: 'departure_time', type: 'datetime' },
];

export const fields2: Field[] = [
  { id: uuidv4(), label: 'sender_first_name', type: 'text', required: true },
  { id: uuidv4(), label: 'sender_last_name', type: 'text', required: true },
  { id: uuidv4(), label: 'sender_mobile', type: 'text' },
];
export const fields3: Field[] = [
  { id: uuidv4(), label: 'recipent_first_name', type: 'text', required: true },
  { id: uuidv4(), label: 'recipent_last_name', type: 'text', required: true },
  { id: uuidv4(), label: 'recipent_mobile', type: 'text' },
];
export const fields4: Field[] = [
  { id: uuidv4(), label: 'firstName', type: 'text', required: true },
  { id: uuidv4(), label: 'lastName', type: 'text', required: true },
  { id: uuidv4(), label: 'email', type: 'email', required: true },
];
export const KeyFields = [
  'departures_point',
  'arrival_points',
  'departure_time',
  'sender_first_name',
  'sender_last_name',
  'sender_mobile',
  'recipent_first_name',
  'recipent_last_name',
  'recipent_mobile',
] as const;
