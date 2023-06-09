import { Field } from 'models/Field';
import { v4 as uuidv4 } from 'uuid';

export const fieldsSearch: Field[] = [
  { id: uuidv4(), required: undefined, label: 'role', type: 'role' },
  { id: uuidv4(), required: undefined, label: 'name', type: 'text' },
  { id: uuidv4(), required: undefined, label: 'phone', type: 'text' },
];

export const getFieldsStepOne = (isEdit?: boolean): Field[] => {
  return [
    { id: uuidv4(), type: 'text', required: true, label: 'lastName' },
    { id: uuidv4(), type: 'text', required: true, label: 'firstName' },
    { id: uuidv4(), type: 'email', required: true, label: 'email', disabled: isEdit },
    { id: uuidv4(), type: 'text', required: true, label: 'phone' },
  ];
};
