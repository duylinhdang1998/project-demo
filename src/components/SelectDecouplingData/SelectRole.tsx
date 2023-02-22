import { useState } from 'react';
import { Control, FieldErrors } from 'react-hook-form';
import { Option } from 'components/CheckboxGroup/CheckboxGroup';
import FormVerticle from 'components/FormVerticle/FormVerticle';
import { UserRole } from 'services/models/UserRole';
import { typeOptions } from 'pages/admin/Staff/constants';

interface SelectRoleProps {
  errors: FieldErrors<any>;
  messages: Record<string, string>;
  control: Control<any, any>;
  role: UserRole;
  onChange: (role: UserRole) => void;
  disabled?: boolean;
}
export const SelectRole = ({ errors, messages, control, role, disabled, onChange }: SelectRoleProps) => {
  const [options] = useState<Option[]>(
    typeOptions.map(option => ({
      key: option.key as string,
      value: option.value as string,
      label: option.label as string,
    })),
  );

  return (
    <FormVerticle
      errors={errors}
      messages={messages}
      fields={[
        {
          type: 'select2',
          required: true,
          label: 'role',
          id: 'role',
          options,
          value: role,
          onChange: value => {
            onChange(value as UserRole);
          },
          onScrollEnd() {},
          isLoading: false,
          disabled: disabled,
        },
      ]}
      control={control}
      filterKey="staff"
    />
  );
};
