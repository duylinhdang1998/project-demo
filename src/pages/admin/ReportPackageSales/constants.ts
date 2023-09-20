import { Field } from 'models/Field';
import { v4 as uuidv4 } from 'uuid';

export const fieldsSearch: Array<Field & { numberColumn?: number }> = [
  { id: uuidv4(), required: undefined, label: 'departurePoints', type: 'arrivalPoint' },
  { id: uuidv4(), required: undefined, label: 'from', type: 'text', placeholder: 'order_id' },
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
