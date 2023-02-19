import { v4 as uuidv4 } from 'uuid';
import { Field } from 'models/Field';

export const fieldsDestinations: Field[] = [
  {
    id: uuidv4(),
    label: 'title',
    type: 'text',
    required: true,
  },
  {
    id: uuidv4(),
    label: 'address',
    type: 'text',
    required: true,
  },
  {
    id: uuidv4(),
    label: 'zipCode',
    type: 'text',
    required: true,
  },
  {
    id: uuidv4(),
    label: 'city',
    type: 'text',
    required: true,
  },
  {
    id: uuidv4(),
    label: 'country',
    type: 'text',
    required: true,
  },
];
