import { Box, Typography } from '@mui/material';
import { isEmpty } from 'lodash';
import { useEffect, useMemo, useState } from 'react';
import { Control, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import ComboButton from 'components/ComboButtonSaveCancel/ComboButton';
import DialogConfirm from 'components/DialogConfirm/DialogConfirm';
import FormVerticle from 'components/FormVerticle/FormVerticle';
import { Option } from 'models/Field';
import { Route } from 'services/models/Route';
import { anyToMoment } from 'utils/anyToMoment';
import { fieldsStepOne } from '../../constants';
import EditPriceTrip from '../EditPriceTrip';
import { SelectVehicle } from './components/SelectVehicle';

const fieldKeys: Array<keyof Route | string> = ['vehicle', 'departurePoint', 'arrivalPoint', 'departureTime', 'arrivalTime'];

export interface StepOneValuesForTripOneway {
  vehicle: string;
  departurePoint: Option;
  arrivalPoint: Option;
  departureTime: any; // moment
  arrivalTime: any; // moment
  ecoAdult: number;
  vipAdult: number;
  ecoStudent: number;
  vipStudent: number;
  ecoChildren: number;
  vipChildren: number;
}

export interface StepOneProps {
  onNextStep?: (values: StepOneValuesForTripOneway) => void;
  onCancel?: (values: StepOneValuesForTripOneway) => void;
  isEdit?: boolean;
  values?: StepOneValuesForTripOneway;
}

export default function StepOne({ onNextStep, onCancel, isEdit, values }: StepOneProps) {
  const { t } = useTranslation(['routers', 'translation']);
  const {
    control,
    formState: { errors },
    handleSubmit,
    getValues,
    resetField,
    reset,
  } = useForm<StepOneValuesForTripOneway>();

  const [open, setOpen] = useState(false);

  const getVehicle = () => {
    return getValues().vehicle;
  };

  const handleClose = () => setOpen(false);
  const handleCancel = () => {
    setOpen(true);
    onCancel?.(getValues());
  };

  const handleSave = (values: StepOneValuesForTripOneway) => {
    onNextStep?.(values);
  };

  const messages = useMemo(() => {
    return fieldKeys.reduce<Record<string, string>>((res, key) => {
      return {
        ...res,
        [key]: t('translation:error_required', { name: t(`routers:${key}`) }),
      };
    }, {});
  }, [t]);

  useEffect(() => {
    if (!!values && !isEmpty(values)) {
      reset({
        ...values,
        arrivalTime: anyToMoment(values.arrivalTime),
        departureTime: anyToMoment(values.departureTime),
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values]);

  return (
    <Box my="24px">
      <SelectVehicle
        control={control}
        errors={errors}
        messages={messages}
        vehicle={getVehicle()}
        onChange={value => {
          resetField('vehicle', { defaultValue: value });
        }}
      />
      <FormVerticle
        errors={errors}
        messages={messages}
        control={control}
        fields={fieldsStepOne}
        indexGridHorizon={-1}
        isGridHorizon
        grid
        filterKey="routers"
      />
      <Typography fontSize={14} color="#45485e" fontWeight={500} py="16px">
        {t('routers:config_prices_per_passenger')}
      </Typography>
      <EditPriceTrip errors={errors} control={control as unknown as Control} />
      <ComboButton textOk={isEdit ? t('translation:save') : t('translation:next')} onCancel={handleCancel} onSave={handleSubmit(handleSave)} />
      <DialogConfirm
        openDialog={open}
        title={t('translation:cancel_type', { type: t(`routers:${isEdit ? 'edit_trip' : 'trip'}`).toLowerCase() })}
        subTitle={t('translation:leave_page')}
        onClose={handleClose}
      />
    </Box>
  );
}
