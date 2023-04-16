import { v4 as uuidv4 } from 'uuid';
import { Field } from 'models/Field';

export const fieldsSearch: Field[] = [
  { id: uuidv4(), label: 'departurePoints', type: 'departurePoint' },
  { id: uuidv4(), label: 'arrivalPoints', type: 'arrivalPoint' },
  { id: uuidv4(), label: 'departureTime', type: 'datetime', picker: 'time', format: 'HH:mm' },
  { id: uuidv4(), label: 'vehicleName', type: 'vehicle' },
];
