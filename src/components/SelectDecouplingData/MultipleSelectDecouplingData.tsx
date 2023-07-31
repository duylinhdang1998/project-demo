import { Box, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useRequest } from 'ahooks';
import { Empty } from 'antd';
import { Option } from 'models/Field';
import { equals } from 'ramda';
import { useEffect, useMemo, useRef } from 'react';
import Select, { ActionMeta, GroupBase, Props as SelectProps, PropsValue, SelectComponentsConfig } from 'react-select';
import { FixedSizeList, ListChildComponentProps } from 'react-window';
import { AnyObject } from 'services/@types/SearchParams';

export interface MultipleSelectDecouplingDataProps<Model extends AnyObject>
  extends Omit<SelectProps<Model, false, GroupBase<Model>>, 'loadingMessage' | 'components' | 'value' | 'options' | 'onChange' | 'isMulti'> {
  values?: Model[];
  onChange?: (values: Model[], actionMeta: ActionMeta<any>) => void;
  service: Parameters<typeof useRequest<Model[], any[]>>[0];
  transformToOption: (model: Model, index?: number) => Option<Model>;
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

export const HEIGHT = 38;
export const MultipleSelectDecouplingData = <Model extends AnyObject>({
  values,
  onChange,
  service,
  transformToOption,
  ...rest
}: MultipleSelectDecouplingDataProps<Model>) => {
  const styles = useStyles();

  const { loading, data } = useRequest<Model[], any[]>(service, {
    retryInterval: 1000,
    staleTime: 30000,
  });

  const menuListRef = useRef<FixedSizeList<ListChildComponentProps>>(null);
  const scrollValueRef = useRef<number | null>(null);

  const options = useMemo(() => {
    return data?.map(transformToOption) ?? [];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const optionValues = useMemo(() => {
    const selectedValues = data?.filter(dataItem => {
      return values?.find(item => equals(item, dataItem));
    });
    return selectedValues ? selectedValues.map(transformToOption) : undefined;
  }, [transformToOption, data, values]);

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
      <FixedSizeList
        width="100%"
        height={children.length < 8 ? HEIGHT * children.length + 2 : maxHeight}
        itemCount={children.length}
        itemSize={HEIGHT}
        initialScrollOffset={initialOffset}
        onScroll={props => {
          if (props.scrollOffset > -HEIGHT && !props.scrollUpdateWasRequested) {
            scrollValueRef.current = props.scrollOffset;
          }
        }}
        ref={menuListRef}
      >
        {({ index, style }) => (
          <Box style={style}>
            <Typography sx={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>{children[index]}</Typography>
          </Box>
        )}
      </FixedSizeList>
    );
  };

  useEffect(() => {
    if (typeof scrollValueRef.current === 'number') {
      menuListRef.current?.scrollTo(scrollValueRef.current);
    }
  }, [optionValues]);

  return (
    <Select
      {...rest}
      maxMenuHeight={options.length < 8 ? HEIGHT * options.length + 2 : undefined}
      // @ts-ignore
      isMulti
      loadingMessage={({ inputValue }) => <Typography>{inputValue}</Typography>}
      // @ts-ignore
      components={{ MenuList: Options }}
      value={optionValues as PropsValue<Model> | undefined}
      onChange={(newValue, actionMeta) => {
        if (Array.isArray(newValue)) {
          const values = newValue.reduce<Model[]>((result, item) => {
            const item_ = item as Option<Model>;
            if (item_.value) {
              return result.concat(item_.value);
            }
            return result;
          }, []);
          onChange?.(values, actionMeta);
        } else {
          onChange?.([], actionMeta);
        }
      }}
      options={options as any}
      isLoading={loading || rest.isLoading}
      closeMenuOnSelect={false}
      hideSelectedOptions={false}
      styles={{
        valueContainer(base, props) {
          return {
            ...base,
            ...(rest.styles?.valueContainer?.(base, props) ?? {}),
            flexWrap: 'nowrap',
          };
        },
      }}
      classNames={{
        placeholder() {
          return styles.placeholder;
        },
      }}
    />
  );
};
