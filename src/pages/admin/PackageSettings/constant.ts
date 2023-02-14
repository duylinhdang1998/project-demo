import { v4 as uuidv4 } from 'uuid';
import { Field } from 'models/Field';

export const fieldsAddPackageSetting: Field[] = [
  {
    id: uuidv4(),
    label: 'title',
    type: 'text',
    required: true,
  },
  {
    id: uuidv4(),
    label: 'description',
    type: 'textarea',
    required: true,
  },
];
