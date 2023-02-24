import { DatePickerProps } from 'antd';
import { Option as CheckboxGroupOption, OptionValue } from 'components/CheckboxGroup/CheckboxGroup';
import { UploadImageResourceProps } from 'components/UploadImageResource/UploadImageResource';
import { UploadPDFResourceProps } from 'components/UploadImageResource/UploadPDFResource';

export interface Option<T = string> {
  key?: string;
  value?: T;
  label?: string;
  [key: string]: any;
}

export interface SimpleField {
  id?: string;
  label?: string;
  type?: 'email' | 'text' | 'select' | 'datetime' | 'number' | 'file' | 'image' | 'checkbox' | 'textarea' | 'country' | 'office' | 'role';
  placeholder?: string;
  options?: Option[];
  prefix?: string;
  required?: boolean;
  showTime?: boolean;
  messageErr?: string;
  picker?: DatePickerProps['picker'];
  format?: DatePickerProps['format'];
  disabled?: boolean;
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
  onChange: (values: OptionValue[]) => void;
  values: OptionValue[];
  equalsFunc: (input: OptionValue, optionValue: OptionValue) => void;
  disabled?: boolean;
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
  onChange: (value: CheckboxGroupOption['value']) => void;
  value: CheckboxGroupOption['value'];
  onScrollEnd: () => void;
  isLoading?: boolean;
  disabled?: boolean;
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
  disabled?: boolean;
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
  disabled?: boolean;
}
export type Field = SimpleField | UploadPDFResourceField | UploadImageResourceField | CheckboxField | SelectField;
