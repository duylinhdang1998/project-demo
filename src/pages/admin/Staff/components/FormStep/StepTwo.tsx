import { Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { Checkbox } from 'antd';
import 'antd/lib/checkbox/style/css';
import { isEmpty } from 'lodash';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { v4 as uuidv4 } from 'uuid';
import ComboButton from 'components/ComboButtonSaveCancel/ComboButton';
import FormVerticle from 'components/FormVerticle/FormVerticle';
import { Field } from 'models/Field';
import { anyToMoment } from 'utils/anyToMoment';

export const ALL_DAYS_OPTION_VALUE = 'all_days';

const options = [
  { label: 'All days', value: ALL_DAYS_OPTION_VALUE },
  { label: 'Monday', value: 'Monday' },
  { label: 'Tuesday', value: 'Tuesday' },
  { label: 'Wednesday', value: 'Wednesday' },
  { label: 'Thursday', value: 'Thursday' },
  { label: 'Friday', value: 'Friday' },
  { label: 'Saturday', value: 'Saturday' },
  { label: 'Sunday', value: 'Sunday' },
];

const fields: Field[] = [
  { id: uuidv4(), label: 'fromDate', type: 'datetime' },
  { id: uuidv4(), label: 'toDate', type: 'datetime' },
];

export interface StepTwoValues {
  days: string[];
  fromDate: any; // moment
  toDate: any; // moment
}

interface StepTwoProps {
  onCancel?: (values: StepTwoValues) => void;
  onNextStep?: (values: StepTwoValues) => void;
  values?: StepTwoValues;
  isLoading?: boolean;
}
export default function StepTwo({ onCancel, onNextStep, values, isLoading }: StepTwoProps) {
  const { control, handleSubmit, getValues, reset, resetField, watch } = useForm<StepTwoValues>();
  const { t } = useTranslation(['staff', 'translation']);

  const onSubmit = (values: StepTwoValues) => {
    onNextStep?.(values);
  };

  useEffect(() => {
    if (!!values && !isEmpty(values)) {
      reset({
        ...values,
        fromDate: anyToMoment({ value: values.fromDate }),
        toDate: anyToMoment({ value: values.toDate }),
        days: values.days.length === options.length - 1 ? [ALL_DAYS_OPTION_VALUE, ...values.days] : values.days,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values]);

  useEffect(() => {
    watch((value, { name }) => {
      if (name === 'days' && value.days?.includes(ALL_DAYS_OPTION_VALUE)) {
        resetField('days', { defaultValue: options.map(option => option.value) });
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watch]);

  return (
    <Box my="24px">
      <Typography color="#0C1132" fontWeight={700} fontSize={14} mb="10px">
        {t('staff:days_of_the_week')}
      </Typography>
      <Controller
        control={control}
        name="days"
        render={({ field }) => (
          <Checkbox.Group {...field}>
            <Grid container spacing={2}>
              {options.map(i => (
                <Grid item xs={4} md={3} key={i.value}>
                  <Checkbox value={i.value}>{i.label}</Checkbox>
                </Grid>
              ))}
            </Grid>
          </Checkbox.Group>
        )}
      />
      <Typography color="#0C1132" fontWeight={700} fontSize={14} my="10px">
        {t('staff:active_period')}
      </Typography>
      <FormVerticle grid control={control} filterKey="staff" fields={fields} />
      <ComboButton
        isSaving={isLoading}
        textOk={t('translation:next')}
        textCancel={t('translation:back')}
        onCancel={() => onCancel?.(getValues())}
        onSave={handleSubmit(onSubmit)}
      />
    </Box>
  );
}
