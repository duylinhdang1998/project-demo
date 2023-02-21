import { v4 as uuidv4 } from 'uuid';
import { Field, Option } from 'models/Field';
import { UserRole } from 'services/models/UserRole';

const typeOptions: Option<UserRole>[] = [
  { key: 'COMPANY_AGENT', value: 'COMPANY_AGENT', label: 'Agent' },
  { key: 'COMPANY_ADMIN', value: 'COMPANY_ADMIN', label: 'Admin' },
  { key: 'PASSENGER', value: 'PASSENGER', label: 'Client' },
];

export const fieldsSearch: Field[] = [
  { id: uuidv4(), label: 'type', options: typeOptions, type: 'select' },
  { id: uuidv4(), label: 'name', type: 'text' },
  { id: uuidv4(), label: 'mobile', type: 'text' },
];
