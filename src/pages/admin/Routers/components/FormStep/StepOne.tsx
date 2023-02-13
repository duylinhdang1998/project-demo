import { Box, Typography } from '@mui/material';
import ComboButton from 'components/ComboButtonSaveCancel/ComboButton';
import DialogConfirm from 'components/DialogConfirm/DialogConfirm';
import FormVerticle from 'components/FormVerticle/FormVerticle';
import { isEmpty } from 'lodash';
import { Option } from 'models/Field';
import { RoutePrograms } from 'models/RoutePrograms';
import { useEffect, useState } from 'react';
import { Control, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { fieldsStepOne } from '../../constants';
import EditPriceTrip from '../EditPriceTrip';

interface Values {
  vehicles_name: Option;
  departures_point: Option;
  arrival_points: Option;
  departure_time: string;
  arrival_time: string;
  eco_adult: string;
  vip_adult: string;
  eco_student: string;
  vip_student: string;
  eco_children: string;
  vip_children: string;
}

export interface StepCountProps {
  onNextStep?: () => void;
  onCancel?: () => void;
  isEdit?: boolean;
  defaultValue?: RoutePrograms;
}

export default function StepOne({ onNextStep, isEdit, defaultValue }: StepCountProps) {
  const { t } = useTranslation(['routers', 'translation']);
  const { control, handleSubmit } = useForm<Values>();

  useEffect(() => {
    if (!!defaultValue && !isEmpty(defaultValue)) {
      console.log('default value step one');
    }
  }, [defaultValue]);

  const [open, setOpen] = useState(false);

  const handleClose = () => setOpen(false);

  const handleCancel = () => {
    setOpen(true);
  };

  const handleSave = (values: Values) => {
    if (isEdit) {
      console.log({ values });
      return;
    }
    onNextStep?.();
  };

  return (
    <Box my="24px">
      <FormVerticle control={control} fields={fieldsStepOne} indexGridHorizon={0} isGridHorizon grid filterKey="routers" />
      <Typography fontSize={14} color="#45485e" fontWeight={500} py="16px">
        {t('config_prices_per_passenger')}
      </Typography>
      <EditPriceTrip control={control as unknown as Control} />
      <ComboButton textOk={isEdit ? t('translation:save') : t('translation:next')} onCancel={handleCancel} onSave={handleSubmit(handleSave)} />
      <DialogConfirm
        openDialog={open}
        title={t('translation:cancel_type', { type: t(isEdit ? 'edit_trip' : 'one_way_trip').toLowerCase() })}
        subTitle={t('translation:leave_page')}
        onClose={handleClose}
      />
    </Box>
  );
}
