import { Box, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useRequest } from 'ahooks';
import { Empty } from 'antd';
import { Option } from 'models/Field';
import { useMemo } from 'react';
import Select, { ActionMeta, GroupBase, Props as SelectProps, PropsValue, SelectComponentsConfig } from 'react-select';
import { FixedSizeList as List } from 'react-window';
import { AnyObject } from 'services/@types/SearchParams';

export interface SingleSelectDecouplingDataProps<Model extends AnyObject>
  extends Omit<
    SelectProps<Model, false, GroupBase<Model>>,
    'loadingMessage' | 'components' | 'value' | 'options' | 'onChange' | 'isMulti' | 'maxMenuHeight'
  > {
  value?: Model;
  onChange?: (value: Model | undefined, actionMeta: ActionMeta<any>) => void;
  service: Parameters<typeof useRequest<Model[], any[]>>[0];
  transformToOption: (model: Model, index?: number) => Option<Model>;
  equalFunc: (model: Model, value: Model | undefined) => boolean;
}

const useStyles = makeStyles(() => {
  return {
    placeholder: {
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
    },
  };
});

const HEIGHT = 38;
export const SingleSelectDecouplingData = <Model extends AnyObject>({
  value,
  onChange,
  service,
  transformToOption,
  equalFunc,
  ...rest
}: SingleSelectDecouplingDataProps<Model>) => {
  const styles = useStyles();

  const { loading, data } = useRequest<Model[], any[]>(service, {
    retryInterval: 1000,
    staleTime: 30000,
  });

  const optionValue = useMemo(() => {
    const selectedValue = data?.find(item => equalFunc(item, value));
    return selectedValue ? transformToOption(selectedValue) : undefined;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, value]);

  const options = useMemo(() => {
    return data?.map(transformToOption) ?? [];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const Options: SelectComponentsConfig<Model, false, GroupBase<Model>>['MenuList'] = ({ options, children, maxHeight, getValue }) => {
    const [value] = getValue();
    const initialOffset = options.indexOf(value) * HEIGHT;

    if (!Array.isArray(children)) {
      return (
        <Box display="flex" alignItems="center" justifyContent="center" padding="8px">
          <Empty />
        </Box>
      );
    }

    return (
      <List
        width="100%"
        height={children.length < 8 ? HEIGHT * children.length + 2 : maxHeight}
        itemCount={children.length}
        itemSize={HEIGHT}
        initialScrollOffset={initialOffset}
      >
        {({ index, style }) => (
          <Box style={style}>
            <Typography
              sx={{
                div: {
                  whiteSpace: 'nowrap',
                  textOverflow: 'ellipsis',
                  overflow: 'hidden',
                },
              }}
            >
              {children[index]}
            </Typography>
          </Box>
        )}
      </List>
    );
  };

  return (
    <Select
      {...rest}
      maxMenuHeight={options.length < 8 ? HEIGHT * options.length + 2 : undefined}
      isMulti={false}
      loadingMessage={({ inputValue }) => <Typography>{inputValue}</Typography>}
      components={{ MenuList: Options }}
      value={optionValue as PropsValue<Model> | undefined}
      onChange={(newValue, actionMeta) => {
        onChange?.(newValue?.value as any, actionMeta);
      }}
      options={options as any}
      isLoading={loading || rest.isLoading}
      classNames={{
        placeholder() {
          return styles.placeholder;
        },
      }}
    />
  );
};
