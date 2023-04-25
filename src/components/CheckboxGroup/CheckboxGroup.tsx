import { Stack, Checkbox, CheckboxProps, FormControlLabel } from '@mui/material';
import { equals } from 'ramda';
import { useEffect, useRef, useState } from 'react';
import { useStyles } from './styles';

export type OptionValue = any;

export interface Option {
  key?: string;
  value?: OptionValue;
  label?: string;
  [key: string]: any;
}

export interface CheckboxGroupProps {
  options: Option[];
  onChange: (values: OptionValue[]) => void;
  values: OptionValue[];
  horizontal?: boolean;
  equalsFunc: (input: OptionValue, optionValue: OptionValue) => boolean; // Deep populate là k có
}

export const CheckboxGroup = ({ options, values, onChange, equalsFunc, horizontal = true }: CheckboxGroupProps) => {
  const classes = useStyles();

  const [valuesState, setValuesState] = useState<OptionValue[]>([]);
  const isStateChangedByResourcesProps = useRef(false);

  const handleChange =
    (value: OptionValue): CheckboxProps['onChange'] =>
    e => {
      isStateChangedByResourcesProps.current = false;
      if (e.target.checked) {
        setValuesState(state => state.concat(value));
      } else {
        setValuesState(state => state.filter(item => !equalsFunc(item, value)));
      }
    };

  useEffect(() => {
    if (!equals(values, valuesState)) {
      isStateChangedByResourcesProps.current = true;
      setValuesState(values);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values]);

  useEffect(() => {
    if (!isStateChangedByResourcesProps.current) {
      onChange(valuesState);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [valuesState]);

  return (
    <Stack direction={horizontal ? 'row' : 'column'} justifyContent="space-between" spacing={2} flexWrap="wrap">
      {options.map(option => {
        if (!option.value) {
          return null;
        }
        const isChecked = valuesState.find(item => equalsFunc(item, option.value));
        return (
          <FormControlLabel
            key={option.key}
            className={classes.label}
            // @ts-ignore
            control={<Checkbox onChange={handleChange(option.value)} checked={!!isChecked} />}
            label={option.label}
            sx={{
              '.MuiFormControlLabel-label': {
                fontSize: '14px !important',
                fontWeight: '400 !important',
              },
            }}
          />
        );
      })}
    </Stack>
  );
};
