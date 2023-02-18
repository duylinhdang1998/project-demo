import { useEffect, useState } from 'react';
import { Control, FieldErrors } from 'react-hook-form';
import { Option } from 'components/CheckboxGroup/CheckboxGroup';
import FormVerticle from 'components/FormVerticle/FormVerticle';
import { Vehicle } from 'services/models/Vehicle';
import { getVehicles } from 'services/Vehicle/Company/getVehicles';

const getOptions = () => {
  return getVehicles({
    page: 0,
    searcher: {},
    sorter: {},
  });
};

interface ServiceSettingsProps {
  errors: FieldErrors<any>;
  messages: Record<string, string>;
  control: Control<any, any>;
  vehicle: Vehicle['_id'];
  onChange: (vehicle: Vehicle['_id']) => void;
}
export const SelectVehicle = ({ errors, messages, control, vehicle, onChange }: ServiceSettingsProps) => {
  const [options, setOptions] = useState<Option[]>([]);

  // FIXME: Đổi sang useRequest của ahooks
  const handleGetOptions = async () => {
    const { data } = await getOptions();
    setOptions(
      data.hits.map(item => ({
        key: item._id,
        label: item.brand,
        value: item._id,
      })),
    );
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
          type: 'select2',
          required: true,
          label: 'vehicle',
          id: 'vehicle',
          options,
          value: vehicle,
          onChange: value => {
            onChange(value);
          },
          // FIXME: Có cần loadmore?
          onScrollEnd() {
            console.log('LOADMORE');
          },
          isLoading: false,
        },
      ]}
      control={control}
      filterKey="routers"
    />
  );
};
