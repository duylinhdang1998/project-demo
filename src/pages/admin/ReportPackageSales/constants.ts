import { Field } from 'models/Field';
import { v4 as uuidv4 } from 'uuid';

export const fieldsSearch: Array<Field & { numberColumn?: number }> = [
  { id: uuidv4(), required: false, label: 'departurePoints', type: 'arrivalPoint', numberColumn: 2 },
  { id: uuidv4(), required: false, label: 'from', type: 'text', placeholder: 'order_id', numberColumn: 2 },
  { id: uuidv4(), required: false, label: 'package', type: 'packageSettings', placeholder: 'package', numberColumn: 2 },
  {
    id: uuidv4(),
    required: false,
    label: 'departureTime',
    picker: 'date',
    type: 'date_range',
    format: ' DD/MM/YYYY',
    numberColumn: 3,
  },
];
