import { FormControlLabel, Radio as MuiRadio, RadioGroup } from '@mui/material';
import { ChangeEvent, memo, useEffect } from 'react';
import { Option } from 'models/Field';

interface RadioProps {
  options: Option[];
  onChange?: (value: string) => void;
  radioName: string;
  value?: string;
}

function Radio({ options, onChange, radioName, value }: RadioProps) {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value: valueRadio } = event.target;
    onChange?.(valueRadio);
  };

  useEffect(() => {
    console.log({ value });
  }, [value]);

  return (
    <RadioGroup value={value} aria-labelledby="demo-row-radio-buttons-group-label" name={radioName} onChange={handleChange}>
      {options.map(o => (
        <FormControlLabel
          key={o.value}
          value={o.value}
          control={<MuiRadio checked={o.value === value} />}
          label={o.label}
          sx={{
            '.MuiFormControlLabel-label': {
              fontSize: '14px !important',
              fontWeight: '400 !important',
            },
          }}
        />
      ))}
    </RadioGroup>
  );
}

export default memo(Radio);
