import { Field } from 'models/Field';
import { v4 as uuidv4 } from 'uuid';

export const fieldsDestinations: Field[] = [
  {
    id: uuidv4(),
    label: 'title',
    type: 'text',
  },
  {
    id: uuidv4(),
    label: 'address',
    type: 'text',
  },
  {
    id: uuidv4(),
    label: 'zip_code',
    type: 'text',
  },
  {
    id: uuidv4(),
    label: 'city',
    type: 'text',
  },
  {
    id: uuidv4(),
    label: 'country',
    type: 'text',
  },
];
