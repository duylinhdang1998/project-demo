import { Field } from 'models/Field';
import { v4 as uuidv4 } from 'uuid';

export const fieldsAddOffice1: Field[] = [
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
];
export const fieldsAddOffice3: Field[] = [
  {
    id: uuidv4(),
    label: 'email',
    type: 'email',
    required: true,
  },
];

export const fieldsAddOffice2: Field[] = [
  {
    id: uuidv4(),
    label: 'zipCode',
    type: 'text',
    required: true,
  },
  {
    id: uuidv4(),
    label: 'country',
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
    label: 'phone',
    type: 'text',
    required: true,
  },
];
