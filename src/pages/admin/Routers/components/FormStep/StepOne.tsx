import { Box, Typography } from '@mui/material';
import ComboButton from 'components/ComboButtonSaveCancel/ComboButton';
import DialogConfirm from 'components/DialogConfirm/DialogConfirm';
import FormVerticle from 'components/FormVerticle/FormVerticle';
import dayjs from 'dayjs';
import { isEmpty } from 'lodash-es';
import { useEffect, useMemo, useState } from 'react';
import { Control, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Route } from 'services/models/Route';
import { Vehicle } from 'services/models/Vehicle';
import { toDayjs } from 'utils/toDayjs';
import EditPriceTrip from '../EditPriceTrip';

const fieldKeys: Array<keyof Route | string> = ['vehicle', 'departurePoint', 'arrivalPoint', 'departureTime', 'arrivalDuration'];

export interface StepOneValuesForOneStopTrip {
  vehicle: Vehicle;
  departurePoint: string;
  arrivalPoint: string;
  departureTime: dayjs.Dayjs;
  arrivalDuration: number;
  ecoAdult: number;
  vipAdult: number;
  ecoStudent: number;
  vipStudent: number;
  ecoChildren: number;
  vipChildren: number;
}

export interface StepOneProps {
  onNextStep?: (values: StepOneValuesForOneStopTrip) => void;
  onCancel?: (values: StepOneValuesForOneStopTrip) => void;
  isEdit?: boolean;
  values?: StepOneValuesForOneStopTrip;
  isLoading?: boolean;
}

export default function StepOne({ onNextStep, onCancel, isEdit, values, isLoading }: StepOneProps) {
  const { t } = useTranslation(['routers', 'translation']);
  const {
    control,
    formState: { errors },
    handleSubmit,
    getValues,
    setValue,
    reset,
  } = useForm<StepOneValuesForOneStopTrip>();

  const [open, setOpen] = useState(false);

  const getVehicle = () => {
    return getValues().vehicle;
  };
  const getDeparturePoint = () => {
    return getValues().departurePoint;
  };
  const getArrivalPoint = () => {
    return getValues().arrivalPoint;
  };

  const handleClose = () => setOpen(false);
  const handleCancel = () => {
    setOpen(true);
    onCancel?.(getValues());
  };

  const handleSave = (values: StepOneValuesForOneStopTrip) => {
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
      console.log(values);
      reset({
        ...values,
        arrivalDuration: values.arrivalDuration,
        departureTime: toDayjs({ value: values.departureTime }),
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values]);

  return (
    <Box my="24px">
      <FormVerticle
        errors={errors}
        messages={messages}
        control={control}
        indexGridHorizon={0}
        isGridHorizon
        grid
        filterKey="routers"
        fields={[
          {
            type: 'controlSelectVehicle',
            label: 'vehicle',
            id: 'vehicle',
            vehicle: getVehicle(),
            onChange: vehicle => {
              setValue('vehicle', vehicle as StepOneValuesForOneStopTrip['vehicle']);
            },
            required: true,
          },
          {
            type: 'controlSelectDestination',
            label: 'departurePoint',
            id: 'departurePoint',
            destination: getDeparturePoint(),
            onChange: departurePoint => {
              setValue('departurePoint', departurePoint as StepOneValuesForOneStopTrip['departurePoint']);
            },
            required: true,
          },
          {
            id: 'departureTime',
            label: 'departureTime',
            type: 'datetime',
            showTime: true,
            required: true,
            picker: 'time',
            format: 'HH:mm',
          },
          {
            id: 'arrivalPoint',
            label: 'arrivalPoint',
            type: 'controlSelectDestination',
            destination: getArrivalPoint(),
            onChange: arrivalPoint => {
              setValue('arrivalPoint', arrivalPoint as StepOneValuesForOneStopTrip['arrivalPoint']);
            },
            required: true,
          },
          { id: 'arrivalDuration', label: 'arrivalDuration', type: 'number', showTime: true, required: true },
        ]}
      />
      <Typography fontSize={14} color="#45485e" fontWeight={500} py="16px">
        {t('routers:config_prices_per_passenger')}
      </Typography>
      <EditPriceTrip errors={errors} control={control as unknown as Control} />
      <ComboButton
        isSaving={isLoading}
        textOk={isEdit ? t('translation:save') : t('translation:next')}
        onCancel={handleCancel}
        onSave={handleSubmit(handleSave)}
      />
      <DialogConfirm
        openDialog={open}
        title={t('translation:cancel_type', { type: t(`routers:${isEdit ? 'edit_trip' : 'trip'}`).toLowerCase() })}
        subTitle={t('translation:leave_page')}
        onClose={handleClose}
      />
    </Box>
  );
}
