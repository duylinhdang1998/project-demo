import { v4 as uuidv4 } from 'uuid';
import { Field } from 'models/Field';

export const fieldsSearch: Field[] = [
  { id: uuidv4(), label: 'name', type: 'text' },
  { id: uuidv4(), label: 'email', type: 'text' },
  { id: uuidv4(), label: 'phone', type: 'text' },
];

export const fieldDetails: Field[] = [
  { id: uuidv4(), label: 'lastName', type: 'text' },
  { id: uuidv4(), label: 'firstName', type: 'text' },
  { id: uuidv4(), label: 'email', type: 'text', disabled: true },
  { id: uuidv4(), label: 'phone', type: 'text' },
  { id: uuidv4(), label: 'country', type: 'text' },
];
