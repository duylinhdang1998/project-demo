import { Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { Checkbox } from 'antd';
import 'antd/lib/checkbox/style/css';
import ComboButton from 'components/ComboButtonSaveCancel/ComboButton';
import FormVerticle from 'components/FormVerticle/FormVerticle';
import { Field } from 'models/Field';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { v4 as uuidv4 } from 'uuid';
import { StepCountProps } from './StepOne';

const options = [
  { label: 'All days', value: 'all_days' },
  { label: 'Monday', value: 'monday' },
  { label: 'Tuesday', value: 'tuesday' },
  { label: 'Wednesday', value: 'wednesday' },
  { label: 'Thursday', value: 'thursday' },
  { label: 'Friday', value: 'friday' },
  { label: 'Saturday', value: 'saturday' },
  { label: 'Sunday', value: 'sunday' },
];

const fields: Field[] = [
  { id: uuidv4(), label: 'from_date', type: 'datetime' },
  { id: uuidv4(), label: 'to_date', type: 'datetime' },
];

interface Values {
  days: string[];
  fromDate: string;
  toDate: string;
}

export default function StepTwo({ onCancel, onNextStep }: StepCountProps) {
  const { control, handleSubmit } = useForm<Values>();
  const { t } = useTranslation(['routers', 'translation']);

  const onSubmit = (values: Values) => {
    console.log({ values });
    onNextStep?.();
  };
  return (
    <Box my="24px">
      <Typography color="#0C1132" fontWeight={700} fontSize={14} mb="10px">
        {t('days_of_the_week')}
      </Typography>
      <Controller
        control={control}
        name="days"
        render={({ field }) => (
          <Checkbox.Group {...field}>
            <Grid container spacing={2}>
              {options.map((i) => (
                <Grid item xs={4} md={3} key={i.value}>
                  <Checkbox value={i.value}>{i.label}</Checkbox>
                </Grid>
              ))}
            </Grid>
          </Checkbox.Group>
        )}
      />
      <Typography color="#0C1132" fontWeight={700} fontSize={14} my="10px">
        {t('active_period')}
      </Typography>
      <FormVerticle grid control={control} filterKey="routers" fields={fields} />
      <ComboButton textOk={t('translation:next')} textCancel={t('translation:back')} onCancel={onCancel} onSave={handleSubmit(onSubmit)} />
    </Box>
  );
}
