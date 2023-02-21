import { DatePickerProps } from 'antd';
import { Option as CheckboxGroupOption } from 'components/CheckboxGroup/CheckboxGroup';
import { UploadImageResourceProps } from 'components/UploadImageResource/UploadImageResource';
import { UploadPDFResourceProps } from 'components/UploadImageResource/UploadPDFResource';

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
  picker?: DatePickerProps['picker'];
  format?: DatePickerProps['format'];
}

export interface CheckboxField {
  type: 'checkbox2';
  prefix?: string;
  required?: boolean;
  showTime?: boolean;
  messageErr?: string;
  id?: string;
  options: CheckboxGroupOption[];
  label: string;
  onChange: (values: string[]) => void;
  values: string[];
}

export interface SelectField {
  type: 'select2';
  prefix?: string;
  required?: boolean;
  showTime?: boolean;
  messageErr?: string;
  id?: string;
  options: CheckboxGroupOption[];
  label: string;
  onChange: (value: string) => void;
  value: string;
  onScrollEnd: () => void;
  isLoading?: boolean;
}
export interface UploadImageResourceField {
  type: 'image_resource';
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

export interface UploadPDFResourceField {
  type: 'pdf_resource';
  prefix?: string;
  required?: boolean;
  showTime?: boolean;
  messageErr?: string;
  id?: string;
  label: string;
  onChange: UploadPDFResourceProps['onChange'];
  resources: UploadPDFResourceProps['resources'];
  multiple: UploadPDFResourceProps['multiple'];
  buttonText: string;
}
export type Field = SimpleField | UploadPDFResourceField | UploadImageResourceField | CheckboxField | SelectField;
