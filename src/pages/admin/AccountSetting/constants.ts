import { v4 as uuidv4 } from 'uuid';
import { Field, Option } from 'models/Field';

const currencyOptions: Option[] = [
  { key: 'usd', value: 'usd', label: 'USD' },
  { key: 'fr', value: 'fr', label: 'Fr' },
];
const fieldAccount1: Field[] = [
  {
    id: uuidv4(),
    label: 'company_name',
    type: 'text',
  },
  {
    id: uuidv4(),
    label: 'address',
    type: 'text',
  },
];
const fieldAccount2: Field[] = [
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

const fieldAccount3: Field[] = [
  {
    id: uuidv4(),
    label: 'email',
    type: 'text',
  },
];
const fieldAccount4: Field[] = [
  {
    id: uuidv4(),
    label: 'transport_license',
    type: 'text',
  },
  {
    id: uuidv4(),
    label: 'currency',
    type: 'select',
    options: currencyOptions,
  },
];

const fieldAccount5: Field[] = [
  {
    id: uuidv4(),
    label: 'attach_profile',
    type: 'image',
  },
  {
    id: uuidv4(),
    label: 'attach_company',
    type: 'image',
  },
];

const fieldKeys = [
  'company_name',
  'address',
  'zip_code',
  'country',
  'city',
  'number_phone',
  'email',
  'transport_license',
  'currency',
  'attach_profile',
  'attach_company',
] as const;

export { fieldAccount1, fieldAccount2, fieldAccount3, fieldAccount4, fieldKeys, fieldAccount5 };
