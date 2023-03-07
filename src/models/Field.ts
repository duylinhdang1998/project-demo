import { DatePickerProps } from 'antd';
import { Option as CheckboxGroupOption, OptionValue } from 'components/CheckboxGroup/CheckboxGroup';
import { SelectArrivalPointProps } from 'components/SelectDecouplingData/SelectArrivalPoint';
import { SelectDeparturePointProps } from 'components/SelectDecouplingData/SelectDeparturePoint';
import { SelectOfficeProps } from 'components/SelectDecouplingData/SelectOffice';
import { SelectRoleProps } from 'components/SelectDecouplingData/SelectRole';
import { SelectVehicleProps } from 'components/SelectDecouplingData/SelectVehicle';
import { UploadImageResourceProps } from 'components/UploadImageResource/UploadImageResource';
import { UploadPDFResourceProps } from 'components/UploadImageResource/UploadPDFResource';

export type SorterCol = 'ascend' | 'descend' | undefined;
export interface Option<T = string> {
  key?: string;
  value?: T;
  label?: string;
  [key: string]: any;
}

interface BaseField {
  prefix?: string;
  required?: boolean;
  showTime?: boolean;
  messageErr?: string;
  id?: string;
  label: string;
  disabled?: boolean;
}

export interface SimpleField {
  id?: string;
  label?: string;
  type?:
    | 'email'
    | 'text'
    | 'select'
    | 'datetime'
    | 'number'
    | 'file'
    | 'image'
    | 'checkbox'
    | 'textarea'
    | 'country'
    | 'office'
    | 'role'
    | 'departurePoint'
    | 'arrivalPoint'
    | 'vehicle';
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

export interface CheckboxField extends BaseField {
  type: 'checkbox2';
  options: CheckboxGroupOption[];
  onChange: (values: OptionValue[]) => void;
  values: OptionValue[];
  equalsFunc: (input: OptionValue, optionValue: OptionValue) => void;
}
export interface SelectField extends BaseField {
  type: 'select2';
  options: CheckboxGroupOption[];
  onChange: (value: CheckboxGroupOption['value']) => void;
  value: CheckboxGroupOption['value'];
  onScrollEnd: () => void;
  isLoading?: boolean;
}
export interface UploadImageResourceField extends BaseField {
  type: 'image_resource';
  onChange: UploadImageResourceProps['onChange'];
  resources: UploadImageResourceProps['resources'];
  multiple: UploadImageResourceProps['multiple'];
}
export interface UploadPDFResourceField extends BaseField {
  type: 'pdf_resource';
  onChange: UploadPDFResourceProps['onChange'];
  resources: UploadPDFResourceProps['resources'];
  multiple: UploadPDFResourceProps['multiple'];
  buttonText: string;
}
export interface ControlSelectVehicleField extends BaseField {
  type: 'controlSelectVehicle';
  vehicle: SelectVehicleProps['vehicle'];
  onChange: SelectVehicleProps['onChange'];
}
export interface ControlSelectDeparturePointField extends BaseField {
  type: 'controlSelectDeparturePoint';
  departurePoint: SelectDeparturePointProps['departurePoint'];
  onChange: SelectDeparturePointProps['onChange'];
}
export interface ControlSelectArrivalPointField extends BaseField {
  type: 'controlSelectArrivalPoint';
  arrivalPoint: SelectArrivalPointProps['arrivalPoint'];
  onChange: SelectArrivalPointProps['onChange'];
}
export interface ControlSelectOfficeField extends BaseField {
  type: 'controlSelectOffice';
  office: SelectOfficeProps['office'];
  onChange: SelectOfficeProps['onChange'];
}
export interface ControlSelectRoleField extends BaseField {
  type: 'controlSelectRole';
  role: SelectRoleProps['role'];
  onChange: SelectRoleProps['onChange'];
}
export type Field =
  | SimpleField
  | UploadPDFResourceField
  | UploadImageResourceField
  | CheckboxField
  | SelectField
  | ControlSelectVehicleField
  | ControlSelectDeparturePointField
  | ControlSelectArrivalPointField
  | ControlSelectOfficeField
  | ControlSelectRoleField;
