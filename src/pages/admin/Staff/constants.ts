import { v4 as uuidv4 } from 'uuid';
import { Field, Option } from 'models/Field';
import { UserRole } from 'services/models/UserRole';

export const labelOfRole: Record<UserRole, string> = {
  COMPANY_ADMIN: 'Admin',
  COMPANY_AGENT: 'Agent',
  PASSENGER: 'Client',
  COMPANY_DRIVER: 'Driver',
};

export const typeOptions: Option<UserRole>[] = [
  { key: 'COMPANY_AGENT', value: 'COMPANY_AGENT', label: labelOfRole.COMPANY_AGENT },
  { key: 'COMPANY_ADMIN', value: 'COMPANY_ADMIN', label: labelOfRole.COMPANY_ADMIN },
  { key: 'PASSENGER', value: 'PASSENGER', label: labelOfRole.PASSENGER },
];

export const fieldsSearch: Field[] = [
  { id: uuidv4(), label: 'role', options: typeOptions, type: 'select' },
  { id: uuidv4(), label: 'name', type: 'text' },
  { id: uuidv4(), label: 'phone', type: 'text' },
];

export const getFieldsStepOne = (isEdit?: boolean): Field[] => {
  return [
    { id: uuidv4(), type: 'text', required: true, label: 'lastName' },
    { id: uuidv4(), type: 'text', required: true, label: 'firstName' },
    { id: uuidv4(), type: 'email', required: true, label: 'email', disabled: isEdit },
    { id: uuidv4(), type: 'text', required: true, label: 'phone' },
  ];
};
