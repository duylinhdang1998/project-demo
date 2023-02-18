import { useEffect, useState } from 'react';
import { Control, FieldErrors } from 'react-hook-form';
import { Option } from 'components/CheckboxGroup/CheckboxGroup';
import FormVerticle from 'components/FormVerticle/FormVerticle';
import { Vehicle } from 'services/models/Vehicle';
import { Values } from './FormAddVehicle';

// FIXME: Chưa có API
const getOptions = () => {
  return Promise.resolve({
    data: {
      hits: [{ _id: '63d9dad539e01f3bee3757dc', title: 'Colis' }],
    },
  });
};

interface MerchandisesProps {
  errors: FieldErrors<Values>;
  messages: Record<string, string>;
  control: Control<Values, any>;
  merchandises: Vehicle['merchandises'];
  onChange: (values: Vehicle['merchandises']) => void;
}
export const Merchandises = ({ errors, messages, control, merchandises, onChange }: MerchandisesProps) => {
  const [options, setOptions] = useState<Option[]>([]);
  // FIXME: Đổi sang useRequest của ahooks
  const handleGetOptions = async () => {
    const { data } = await getOptions();
    setOptions(data.hits.map(item => ({ key: item._id, label: item.title, value: item._id })));
  };

  useEffect(() => {
    handleGetOptions();
  }, []);

  // FIXME: Loading component

  return (
    <FormVerticle
      errors={errors}
      messages={messages}
      fields={[
        {
          type: 'checkbox2',
          options: options,
          label: 'merchandises',
          values: merchandises,
          onChange: onChange,
        },
      ]}
      control={control}
      filterKey="vehicles"
    />
  );
};
