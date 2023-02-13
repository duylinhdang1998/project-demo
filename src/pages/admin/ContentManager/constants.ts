import { v4 as uuid } from 'uuid';
import { Field } from 'models/Field';

export const sidebarFields: Field[] = [
  { id: uuid(), type: 'text', label: 'postalAddress' },
  { id: uuid(), type: 'text', label: 'zipCode' },
  { id: uuid(), type: 'text', label: 'city' },
  { id: uuid(), type: 'text', label: 'phone' },
  { id: uuid(), type: 'text', label: 'email' },
];

export const footerFields: Field[] = [{ id: uuid(), type: 'textarea', label: 'footerText' }];
