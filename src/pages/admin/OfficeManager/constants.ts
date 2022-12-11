import { Field } from 'models/Field';
import { v4 as uuidv4 } from 'uuid';

export const fieldsAddOffice1: Field[] = [
  {
    id: uuidv4(),
    label: 'office_title',
    type: 'text',
  },
  {
    id: uuidv4(),
    label: 'address',
    type: 'text',
  },
];
export const fieldsAddOffice3: Field[] = [
  {
    id: uuidv4(),
    label: 'email',
    type: 'text',
  },
];

export const fieldsAddOffice2: Field[] = [
  {
    id: uuidv4(),
    label: 'zip_code',
    type: 'text',
  },
  {
    id: uuidv4(),
    label: 'country',
    type: 'text',
  },
  {
    id: uuidv4(),
    label: 'city',
    type: 'text',
  },
  {
    id: uuidv4(),
    label: 'phone_number',
    type: 'text',
  },
];
