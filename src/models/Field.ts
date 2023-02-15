import { UploadImageResourceProps } from 'components/UploadImageResource/UploadImageResource';

export interface Option {
  key?: string;
  value?: string;
  [key: string]: any;
}

export interface SimpleField {
  id?: string;
  label?: string;
  type?: 'email' | 'text' | 'select' | 'datetime' | 'number' | 'file' | 'image' | 'checkbox' | 'textarea';
  placeholder?: string;
  options?: Option[];
  prefix?: string;
  required?: boolean;
  showTime?: boolean;
  messageErr?: string;
}

export interface UploadImageResourceField {
  type: 'image_resource';
  options?: Option[];
  prefix?: string;
  required?: boolean;
  showTime?: boolean;
  messageErr?: string;
  id?: string;
  label: string;
  onChange: UploadImageResourceProps['onChange'];
  resources: UploadImageResourceProps['resources'];
  multiple: UploadImageResourceProps['multiple'];
}

export type Field = SimpleField | UploadImageResourceField;
