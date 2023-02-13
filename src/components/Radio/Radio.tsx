import { FormControlLabel, Radio as MuiRadio, RadioGroup } from '@mui/material';
import { Option } from 'models/Field';
import { ChangeEvent, memo } from 'react';

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
  return (
    <RadioGroup value={value} aria-labelledby="demo-row-radio-buttons-group-label" name={radioName} onChange={handleChange}>
      {options.map((o) => (
        <FormControlLabel
          value={o.value}
          control={<MuiRadio />}
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
