import { Field, Option } from 'models/Field';
import { v4 as uuidv4 } from 'uuid';

export const fieldsSearch: Field[] = [
  { id: uuidv4(), label: 'name', type: 'text' },
  { id: uuidv4(), label: 'email', type: 'text' },
  { id: uuidv4(), label: 'mobile', type: 'text' },
];

export const fieldDetails: Field[] = [
  { id: uuidv4(), label: 'lastName', type: 'text' },
  { id: uuidv4(), label: 'firstName', type: 'text' },
  { id: uuidv4(), label: 'email', type: 'text' },
  { id: uuidv4(), label: 'mobile', type: 'text' },
  { id: uuidv4(), label: 'country', type: 'text' },
];
