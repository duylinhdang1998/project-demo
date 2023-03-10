import { Field } from 'models/Field';
import { v4 as uuidv4 } from 'uuid';

export const fields: Field[] = [
  { id: uuidv4(), label: 'departurePoint', type: 'departurePoint' },
  { id: uuidv4(), label: 'arrivalPoint', type: 'arrivalPoint' },
  { id: uuidv4(), label: 'departureTime', type: 'datetime', showTime: true, picker: 'time', format: 'HH:mm' },
];
