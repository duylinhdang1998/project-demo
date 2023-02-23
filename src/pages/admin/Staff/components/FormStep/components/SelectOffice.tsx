import { useEffect, useState } from 'react';
import { Control, FieldErrors } from 'react-hook-form';
import { Option } from 'components/CheckboxGroup/CheckboxGroup';
import FormVerticle from 'components/FormVerticle/FormVerticle';
import { Office } from 'services/models/Office';
import { getOffices } from 'services/OfficesManager/Company/getOffices';

const getOptions = () => {
  return getOffices({
    page: 0,
    searcher: {},
    sorter: {},
  });
};

interface ServiceSettingsProps {
  errors: FieldErrors<any>;
  messages: Record<string, string>;
  control: Control<any, any>;
  office: Office;
  onChange: (office: Office) => void;
}
export const SelectOffice = ({ errors, messages, control, office, onChange }: ServiceSettingsProps) => {
  const [options, setOptions] = useState<Option[]>([]);

  // FIXME: Đổi sang useRequest của ahooks
  const handleGetOptions = async () => {
    const { data } = await getOptions();
    setOptions(
      data.hits.map(item => ({
        key: item._id,
        label: item.title,
        value: item,
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
          label: 'office',
          id: 'office',
          options,
          value: office,
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
      filterKey="staff"
    />
  );
};
