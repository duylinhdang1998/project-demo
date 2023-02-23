import { Option } from 'components/CheckboxGroup/CheckboxGroup';
import FormVerticle from 'components/FormVerticle/FormVerticle';
import { omit } from 'lodash';
import { equals } from 'ramda';
import { useEffect, useState } from 'react';
import { Control, FieldErrors } from 'react-hook-form';
import { ServiceSetting } from 'services/models/ServiceSetting';
import { Vehicle } from 'services/models/Vehicle';
import { getServiceSettings } from 'services/ServiceSetting/Company/getServiceSettings';
import { Values } from './FormAddVehicle';

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
    setOptions(data.hits.map(item => ({ key: item._id, label: item.title, value: item })));
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
          label: 'services',
          values: services,
          onChange: onChange,
          id: 'services',
          equalsFunc(input, optionValue) {
            const input_ = input as Vehicle['services'][number];
            const optionValue_ = optionValue as ServiceSetting[];
            return equals(omit(input_, ['icon']), omit(optionValue_, ['icon']));
          },
        },
      ]}
      control={control}
      filterKey="vehicles"
    />
  );
};
