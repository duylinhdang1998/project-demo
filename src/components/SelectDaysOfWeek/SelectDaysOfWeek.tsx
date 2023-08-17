import { Grid } from '@mui/material';
import { Checkbox } from 'antd';
import { Control, Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

export interface SelectDaysOfWeekProps {
  control: Control<any>;
  name: string;
  values: string[];
  onChange: (values: string[]) => void;
}
export const ALL_DAYS_OPTION_VALUE = 'all_days';

export const options = [
  { label: 'all_days', value: ALL_DAYS_OPTION_VALUE },
  { label: 'monday', value: 'Monday' },
  { label: 'tuesday', value: 'Tuesday' },
  { label: 'wednesday', value: 'Wednesday' },
  { label: 'thursday', value: 'Thursday' },
  { label: 'friday', value: 'Friday' },
  { label: 'saturday', value: 'Saturday' },
  { label: 'sunday', value: 'Sunday' },
];

export const SelectDaysOfWeek = ({ control, name, values, onChange }: SelectDaysOfWeekProps) => {
  const { t } = useTranslation('routers');
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <Checkbox.Group
          {...field}
          onChange={value => {
            const lastItem = value[value.length - 1];
            // Nếu đã check all trước đó mà mảng "value" sau k có 'all_days' thì chứng tỏ action này là uncheck check all
            if (values.includes(ALL_DAYS_OPTION_VALUE) && !value.includes(ALL_DAYS_OPTION_VALUE)) {
              onChange([]);
            }
            // Nếu chưa check all mà check vào check all thì đc coi là check all
            else if (lastItem === ALL_DAYS_OPTION_VALUE && value.length !== options.length) {
              onChange(options.map(option => option.value));
            }
            // Nếu chưa check all nhưng check đủ 7 ngày thì đc coi là check all
            else if (!value.includes(ALL_DAYS_OPTION_VALUE) && value.length === options.length - 1) {
              onChange(options.map(option => option.value));
            }
            // Nếu đang ở trạng thái check all mà bỏ 1 item bất kì thì đc coi là k check all
            else if (value.includes(ALL_DAYS_OPTION_VALUE) && value.length !== options.length) {
              onChange(
                value.reduce<string[]>((result, item) => {
                  if (item !== ALL_DAYS_OPTION_VALUE) {
                    return result.concat(item as string);
                  }
                  return result;
                }, []),
              );
            } else {
              onChange(value as string[]);
            }
          }}
        >
          <Grid container spacing={2}>
            {options.map(i => (
              <Grid item xs={4} md={3} key={i.value}>
                <Checkbox value={i.value}>{t(`${i.label}`)}</Checkbox>
              </Grid>
            ))}
          </Grid>
        </Checkbox.Group>
      )}
    />
  );
};
