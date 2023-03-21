import { Typography } from '@mui/material';
import { useRequest } from 'ahooks';
import { Option } from 'models/Field';
import { useMemo } from 'react';
import Select, { ActionMeta, GroupBase, Props as SelectProps, PropsValue, SelectComponentsConfig } from 'react-select';
import { FixedSizeList as List } from 'react-window';
import { AnyObject } from 'services/@types/SearchParams';

export interface SingleSelectDecouplingDataProps<Model extends AnyObject>
  extends Omit<SelectProps<Model, false, GroupBase<Model>>, 'loadingMessage' | 'components' | 'value' | 'options' | 'onChange' | 'isMulti'> {
  value?: Model;
  onChange?: (value: Model | undefined, actionMeta: ActionMeta<any>) => void;
  service: Parameters<typeof useRequest<Model[], any[]>>[0];
  transformToOption: (model: Model, index?: number) => Option<Model>;
  equalFunc: (model: Model, value: Model | undefined) => boolean;
}

export const HEIGHT = 38;
export const SingleSelectDecouplingData = <Model extends AnyObject>({
  value,
  onChange,
  service,
  transformToOption,
  equalFunc,
  ...rest
}: SingleSelectDecouplingDataProps<Model>) => {
  const { loading, data } = useRequest<Model[], any[]>(service, {
    retryInterval: 1000,
    staleTime: 30000,
  });

  const optionValue = useMemo(() => {
    const selectedValue = data?.find(item => equalFunc(item, value));
    return selectedValue ? transformToOption(selectedValue) : undefined;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, value]);

  const Options: SelectComponentsConfig<Model, false, GroupBase<Model>>['MenuList'] = ({ options, children, maxHeight, getValue }) => {
    const [value] = getValue();
    const initialOffset = options.indexOf(value) * HEIGHT;

    if (!Array.isArray(children)) {
      return null;
    }

    return (
      <List width="100%" height={maxHeight} itemCount={children.length} itemSize={HEIGHT} initialScrollOffset={initialOffset}>
        {({ index, style }) => <div style={style}>{children[index]}</div>}
      </List>
    );
  };

  return (
    <Select
      {...rest}
      isMulti={false}
      loadingMessage={({ inputValue }) => <Typography>{inputValue}</Typography>}
      components={{ MenuList: Options }}
      value={optionValue as PropsValue<Model> | undefined}
      onChange={(newValue, actionMeta) => {
        onChange?.(newValue?.value as any, actionMeta);
      }}
      options={data?.map(transformToOption) as any}
      isLoading={loading || rest.isLoading}
    />
  );
};
