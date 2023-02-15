import { useEffect, useState } from 'react';
import { Control, FieldErrors } from 'react-hook-form';
import { Option } from 'components/CheckboxGroup/CheckboxGroup';
import FormVerticle from 'components/FormVerticle/FormVerticle';
import { Vehicle } from 'services/models/Vehicle';
import { getServiceSettings } from 'services/ServiceSetting/Company/getServiceSettings';
import { Values } from './FormAddVehicles';

const getOptions = () => {
  return getServiceSettings({
    page: 0,
    searcher: {},
    sorter: {},
  });
};

interface ServiceSettingsProps {
  errors: FieldErrors<Values>;
  messages: Record<string, string>;
  control: Control<Values, any>;
  services: Vehicle['services'];
  onChange: (values: Vehicle['services']) => void;
}
export const ServiceSettings = ({ errors, messages, control, services, onChange }: ServiceSettingsProps) => {
  const [options, setOptions] = useState<Option[]>([]);
  // FIXME: Đổi sang useRequest của ahooks
  const handleGetOptions = async () => {
    const { data } = await getOptions();
    setOptions(data.hits.map(item => ({ key: item._id, label: item.title, value: item._id })));
  };

  useEffect(() => {
    handleGetOptions();
  }, []);

  return (
    <FormVerticle
      errors={errors}
      messages={messages}
      fields={[
        {
          type: 'checkbox2',
          options: options,
          label: 'services',
          values: services,
          onChange: onChange,
        },
      ]}
      control={control}
      filterKey="vehicles"
    />
  );
};
