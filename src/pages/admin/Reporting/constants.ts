import { v4 as uuidv4 } from 'uuid';
import { Field } from 'models/Field';

export const fieldsSearch: Array<Field & { numberColumn?: number }> = [
  {
    id: uuidv4(),
    required: false,
    label: 'departureTime',
    picker: 'date',
    type: 'date_range',
    format: ' DD/MM/YYYY',
    numberColumn: 3,
  },
  { id: uuidv4(), required: false, label: 'departurePoints', type: 'departurePoint' },
  { id: uuidv4(), required: false, label: 'arrivalPoints', type: 'arrivalPoint' },
  { id: uuidv4(), required: false, label: 'routeId', type: 'text', numberColumn: 2 },
];
