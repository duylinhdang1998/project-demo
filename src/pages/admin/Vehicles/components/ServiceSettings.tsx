import { useRequest } from 'ahooks';
import { Option } from 'components/CheckboxGroup/CheckboxGroup';
import FormVerticle from 'components/FormVerticle/FormVerticle';
import { omit } from 'lodash';
import { equals } from 'ramda';
import { useEffect, useState } from 'react';
import { Control, FieldErrors } from 'react-hook-form';
import { Vehicle } from 'services/models/Vehicle';
import { getServiceSettings } from 'services/ServiceSetting/Company/getServiceSettings';
import { Values } from './FormAddVehicle';

const getServiceSettings_ = async () => {
  try {
    const response = await getServiceSettings({
      page: 0,
      searcher: {},
      sorter: {},
    });
    return response.data.hits;
  } catch {
    return [];
  }
};

interface ServiceSettingsProps {
  errors: FieldErrors<Values>;
  messages: Record<string, string>;
  control: Control<Values, any>;
  services: Vehicle['services'];
  onChange: (values: Vehicle['services']) => void;
}
export const ServiceSettings = ({ errors, messages, control, services, onChange }: ServiceSettingsProps) => {
  const { data = [] } = useRequest(getServiceSettings_, {
    retryInterval: 1000,
    staleTime: 30000,
  });

  const [options, setOptions] = useState<Option[]>([]);

  useEffect(() => {
    setOptions(data.map(item => ({ key: item._id, label: item.title, value: item })));
  }, [data]);

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
            const optionValue_ = optionValue as Vehicle['services'][number];
            return equals(omit(input_, ['icon']), omit(optionValue_, ['icon']));
          },
        },
      ]}
      control={control}
      filterKey="vehicles"
    />
  );
};
