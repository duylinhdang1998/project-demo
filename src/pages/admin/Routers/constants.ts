import { v4 as uuidv4 } from 'uuid';
import { Field } from 'models/Field';

export const fieldsSearch: Field[] = [
  { id: uuidv4(), label: 'departurePoint', type: 'departurePoint' },
  { id: uuidv4(), label: 'arrivalPoint', type: 'arrivalPoint' },
  { id: uuidv4(), label: 'departureTime', type: 'datetime', picker: 'time', format: 'HH:mm' },
  { id: uuidv4(), label: 'vehicle', type: 'vehicle' },
];
