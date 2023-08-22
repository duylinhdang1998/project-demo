import { DatePickerProps, InputNumberProps } from 'antd';
import { CheckboxGroupProps, Option as CheckboxGroupOption } from 'components/CheckboxGroup/CheckboxGroup';
import { SelectArrivalPointProps } from 'components/SelectDecouplingData/SelectArrivalPoint';
import { SelectDeparturePointProps } from 'components/SelectDecouplingData/SelectDeparturePoint';
import { SelectDestinationProps } from 'components/SelectDecouplingData/SelectDestination';
import { SelectOfficeProps } from 'components/SelectDecouplingData/SelectOffice';
import { SelectPackageSettingsProps } from 'components/SelectDecouplingData/SelectPackageSettings';
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
  required: boolean | undefined;
  showTime?: boolean;
  messageErr?: string;
  id?: string;
  label: string;
  name?: string;
  disabled?: boolean;
  readOnly?: boolean;
  description?: string;
  className?: string;
}

export interface SimpleField extends BaseField {
  type?:
    | 'email'
    | 'text'
    | 'select'
    | 'datetime'
    | 'file'
    | 'image'
    | 'checkbox'
    | 'textarea'
    | 'country'
    | 'office'
    | 'role'
    | 'departurePoint'
    | 'arrivalPoint'
    | 'vehicle'
    | 'packageSettings';
  placeholder?: string;
  options?: Option[];
  prefix?: string;
  showTime?: boolean;
  picker?: DatePickerProps['picker'];
  format?: DatePickerProps['format'];
  isClearable?: boolean;
}

export interface DatePickerRange extends BaseField {
  type: 'date_range';
  showTime?: boolean;
  picker?: DatePickerProps['picker'];
  format?: DatePickerProps['format'];
}

export interface NumberField extends BaseField {
  type: 'number';
  parser?: InputNumberProps['parser'];
  formatter?: InputNumberProps['formatter'];
}

export interface CheckboxField extends BaseField {
  type: 'checkbox2';
  options: CheckboxGroupProps['options'];
  onChange: CheckboxGroupProps['onChange'];
  values: CheckboxGroupProps['values'];
  equalsFunc: CheckboxGroupProps['equalsFunc'];
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
  withFileInfomation: UploadImageResourceProps['withFileInfomation'];
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
export interface ControlSelectPackageSettings extends BaseField {
  type: 'controlSelectPackageSettings';
  packageSettings: SelectPackageSettingsProps['packageSettings'];
  onChange: SelectPackageSettingsProps['onChange'];
}
export interface ControlSelectDestination extends BaseField {
  type: 'controlSelectDestination';
  destination: SelectDestinationProps['destination'];
  onChange: SelectDestinationProps['onChange'];
}
export interface ControlSelectDestination extends BaseField {
  type: 'controlSelectDestination';
  destination: SelectDestinationProps['destination'];
  onChange: SelectDestinationProps['onChange'];
}
export interface ControlSelectDestination extends BaseField {
  type: 'controlSelectDestination';
  destination: SelectDestinationProps['destination'];
  onChange: SelectDestinationProps['onChange'];
}
export type Field =
  | SimpleField
  | NumberField
  | UploadPDFResourceField
  | UploadImageResourceField
  | CheckboxField
  | SelectField
  | ControlSelectVehicleField
  | ControlSelectDeparturePointField
  | ControlSelectArrivalPointField
  | ControlSelectOfficeField
  | ControlSelectRoleField
  | ControlSelectPackageSettings
  | ControlSelectDestination
  | DatePickerRange;
