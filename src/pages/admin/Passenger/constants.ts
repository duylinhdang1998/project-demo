import { v4 as uuidv4 } from 'uuid';
import { Field } from 'models/Field';

export const fieldsSearch: Field[] = [
  { id: uuidv4(), required: undefined, label: 'name', type: 'text' },
  { id: uuidv4(), required: undefined, label: 'email', type: 'text' },
  { id: uuidv4(), required: undefined, label: 'phone', type: 'text' },
];

export const fieldDetails = (isEditAction: boolean): Field[] => [
  { id: uuidv4(), required: true, label: 'lastName', type: 'text', readOnly: !isEditAction },
  { id: uuidv4(), required: true, label: 'firstName', type: 'text', readOnly: !isEditAction },
  { id: uuidv4(), required: true, label: 'email', type: 'text', readOnly: !isEditAction, disabled: isEditAction },
  { id: uuidv4(), required: true, label: 'phone', type: 'text', readOnly: !isEditAction },
  { id: uuidv4(), required: true, label: 'country', type: 'text', readOnly: !isEditAction },
];
