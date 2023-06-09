import { Checkbox, CheckboxProps, FormControlLabel, Stack } from '@mui/material';
import { equals } from 'ramda';
import { useEffect, useState } from 'react';
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

  const handleChange =
    (value: OptionValue): CheckboxProps['onChange'] =>
    e => {
      if (e.target.checked) {
        const nextState = valuesState.concat(value);
        setValuesState(nextState);
        onChange?.(nextState);
      } else {
        const nextState = valuesState.filter(item => !equalsFunc(item, value));
        setValuesState(nextState);
        onChange?.(nextState);
      }
    };

  useEffect(() => {
    if (!equals(values, valuesState)) {
      setValuesState(values);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values]);

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
