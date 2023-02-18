import { Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { Checkbox } from 'antd';
import 'antd/lib/checkbox/style/css';
import { isEmpty } from 'lodash';
import moment, { isMoment } from 'moment';
import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { v4 as uuidv4 } from 'uuid';
import ComboButton from 'components/ComboButtonSaveCancel/ComboButton';
import FormVerticle from 'components/FormVerticle/FormVerticle';
import { Field } from 'models/Field';

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
}
export default function StepTwo({ onCancel, onNextStep, values }: StepTwoProps) {
  const { control, handleSubmit, getValues, reset } = useForm<StepTwoValues>();
  const { t } = useTranslation(['routers', 'translation']);

  const onSubmit = (values: StepTwoValues) => {
    onNextStep?.(values);
  };

  useEffect(() => {
    if (!!values && !isEmpty(values)) {
      reset({
        ...values,
        fromDate: isMoment(values.fromDate) ? values.fromDate : moment(values.fromDate),
        toDate: isMoment(values.toDate) ? values.fromDate : moment(values.fromDate),
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values]);

  return (
    <Box my="24px">
      <Typography color="#0C1132" fontWeight={700} fontSize={14} mb="10px">
        {t('routers:days_of_the_week')}
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
        {t('routers:active_period')}
      </Typography>
      <FormVerticle grid control={control} filterKey="routers" fields={fields} />
      <ComboButton
        textOk={t('translation:next')}
        textCancel={t('translation:back')}
        onCancel={() => onCancel?.(getValues())}
        onSave={handleSubmit(onSubmit)}
      />
    </Box>
  );
}
