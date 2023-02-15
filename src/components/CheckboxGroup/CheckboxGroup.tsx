import { Stack, Checkbox, CheckboxProps, FormControlLabel } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { Option } from 'models/Field';
import { useStyles } from './styles';

interface CheckboxGroupProps {
  options: Option[];
  onChange: (values: string[]) => void;
  values: string[];
}

export const CheckboxGroup = ({ options, values, onChange }: CheckboxGroupProps) => {
  const classes = useStyles();

  const [valuesState, setValuesState] = useState<string[]>([]);
  const isStateChangedByResourcesProps = useRef(false);

  const handleChange =
    (value: string): CheckboxProps['onChange'] =>
    e => {
      if (e.target.checked) {
        setValuesState(state => state.concat(value));
      } else {
        setValuesState(state => state.filter(item => item !== value));
      }
    };

  useEffect(() => {
    // FIXME: Thêm ramda check equals
    setValuesState(values);
    isStateChangedByResourcesProps.current = true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values]);

  useEffect(() => {
    if (!isStateChangedByResourcesProps.current) {
      onChange(valuesState);
    }
    isStateChangedByResourcesProps.current = false;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [valuesState]);

  return (
    <Stack direction="row" justifyContent="space-between" spacing={2}>
      {options.map(option => {
        return (
          <FormControlLabel
            key={option.key}
            className={classes.label}
            control={<Checkbox onChange={handleChange(option.value)} checked={valuesState.includes(option.value)} />}
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
