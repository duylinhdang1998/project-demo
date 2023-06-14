import { v4 as uuidv4 } from 'uuid';
import { Field } from 'models/Field';

export const fieldsSearch: Field[] = [
  { id: uuidv4(), required: undefined, label: 'departurePoints', type: 'departurePoint' },
  { id: uuidv4(), required: undefined, label: 'arrivalPoints', type: 'arrivalPoint' },
  { id: uuidv4(), required: undefined, label: 'departureTime', type: 'datetime', showTime: true, format: 'DD/MM/YYYY - HH[H]mm' },
  { id: uuidv4(), required: undefined, label: 'vehicleName', type: 'vehicle' },
];
