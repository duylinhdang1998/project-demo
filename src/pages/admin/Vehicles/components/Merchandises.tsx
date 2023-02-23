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

// FIXME: Chưa có api merchandises
export const Merchandises = ({ errors, messages, control }: MerchandisesProps) => {
  return <FormVerticle errors={errors} messages={messages} fields={[]} control={control} filterKey="vehicles" />;
};
