import { v4 as uuidv4 } from 'uuid';
import { Field, Option } from 'models/Field';

const typeOptions: Option[] = [
  { key: 'agent', value: 'agent', label: 'Agent' },
  { key: 'admin', value: 'admin', label: 'Admin' },
  { key: 'client', value: 'client', label: 'Client' },
];

export const fieldsSearch: Field[] = [
  { id: uuidv4(), label: 'type', options: typeOptions, type: 'select' },
  { id: uuidv4(), label: 'name', type: 'text' },
  { id: uuidv4(), label: 'mobile', type: 'text' },
];
