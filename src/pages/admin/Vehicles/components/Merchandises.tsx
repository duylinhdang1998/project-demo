import FormVerticle from 'components/FormVerticle/FormVerticle';
import { Control, FieldErrors } from 'react-hook-form';
import { Vehicle } from 'services/models/Vehicle';
import { Values } from './FormAddVehicle';

interface MerchandisesProps {
  errors: FieldErrors<Values>;
  messages: Record<string, string>;
  control: Control<Values, any>;
  merchandises: Vehicle['merchandises'];
  onChange: (values: Vehicle['merchandises']) => void;
}

export const Merchandises = ({ errors, messages, control, merchandises, onChange }: MerchandisesProps) => {
  return (
    <FormVerticle
      errors={errors}
      messages={messages}
      fields={[
        {
          type: 'controlSelectPackageSettings',
          id: 'merchandises',
          label: 'merchandises',
          packageSettings: merchandises,
          onChange,
        },
      ]}
      control={control}
      filterKey="vehicles"
    />
  );
};
