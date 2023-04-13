import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import 'antd/lib/checkbox/style/css';
import ComboButton from 'components/ComboButtonSaveCancel/ComboButton';
import FormVerticle from 'components/FormVerticle/FormVerticle';
import { ALL_DAYS_OPTION_VALUE, options, SelectDaysOfWeek } from 'components/SelectDaysOfWeek/SelectDaysOfWeek';
import dayjs from 'dayjs';
import { isEmpty } from 'lodash-es';
import { Field } from 'models/Field';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { toDayjs } from 'utils/toDayjs';
import { v4 as uuidv4 } from 'uuid';

const fields: Field[] = [
  { id: uuidv4(), label: 'fromDate', type: 'datetime' },
  { id: uuidv4(), label: 'toDate', type: 'datetime' },
];

export interface StepTwoValues {
  days: string[];
  fromDate: dayjs.Dayjs;
  toDate: dayjs.Dayjs;
}

interface StepTwoProps {
  onCancel?: (values: StepTwoValues) => void;
  onNextStep?: (values: StepTwoValues) => void;
  values?: StepTwoValues;
  isLoading?: boolean;
}
export default function StepTwo({ onCancel, onNextStep, values, isLoading }: StepTwoProps) {
  const { control, handleSubmit, reset, setValue, getValues, watch } = useForm<StepTwoValues>();
  const days = watch('days');
  const { t } = useTranslation(['staff', 'translation']);

  const onSubmit = (values: StepTwoValues) => {
    onNextStep?.(values);
  };

  useEffect(() => {
    if (!!values && !isEmpty(values)) {
      reset({
        ...values,
        fromDate: toDayjs({ value: values.fromDate }),
        toDate: toDayjs({ value: values.toDate }),
        days: values.days.length === options.length - 1 ? [ALL_DAYS_OPTION_VALUE, ...values.days] : values.days,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values]);

  return (
    <Box my="24px">
      <Typography color="#0C1132" fontWeight={700} fontSize={14} mb="10px">
        {t('staff:days_of_the_week')}
      </Typography>
      <SelectDaysOfWeek control={control} name="days" onChange={values => setValue('days', values)} values={days ?? []} />
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
