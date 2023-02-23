import { Typography } from '@mui/material';
import { useRequest } from 'ahooks';
import { Option } from 'models/Field';
import Select, { ActionMeta, GroupBase, SelectComponentsConfig, SingleValue, Props as SelectProps } from 'react-select';
import { FixedSizeList as List } from 'react-window';
import { AnyObject } from 'services/@types/SearchParams';

export interface SelectDecouplingData<Model extends AnyObject>
  extends Omit<SelectProps<Model, false, GroupBase<Model>>, 'loadingMessage' | 'components' | 'value' | 'options' | 'onChange'> {
  value?: Model;
  onChange?: (value: SingleValue<Model>, actionMeta: ActionMeta<any>) => void;
  service: Parameters<typeof useRequest<Model[], any[]>>[0];
  transformToOption: (model: Model, index: number) => Option<Model>;
}

export const SelectDecouplingData = <Model extends AnyObject>({
  value,
  onChange,
  service,
  transformToOption,
  ...rest
}: SelectDecouplingData<Model>) => {
  const { loading, data } = useRequest<Model[], any[]>(service, {
    retryCount: 3,
    retryInterval: 1000,
    refreshOnWindowFocus: true,
    staleTime: 30000,
  });
  const height = 38;
  const Options: SelectComponentsConfig<Model, false, GroupBase<Model>>['MenuList'] = ({ options, children, maxHeight, getValue }) => {
    const [value] = getValue();
    const initialOffset = options.indexOf(value) * height;

    if (!Array.isArray(children)) {
      return null;
    }

    return (
      <List width="100%" height={maxHeight} itemCount={children.length} itemSize={height} initialScrollOffset={initialOffset}>
        {({ index, style }) => <div style={style}>{children[index]}</div>}
      </List>
    );
  };

  return (
    <Select
      {...rest}
      loadingMessage={({ inputValue }) => <Typography>{inputValue}</Typography>}
      components={{ MenuList: Options }}
      value={value}
      onChange={onChange}
      options={data?.map(transformToOption) as any}
      isLoading={loading || rest.isLoading}
    />
  );
};
