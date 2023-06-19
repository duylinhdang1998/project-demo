import { Box, Typography } from '@mui/material';
import ComboButton from 'components/ComboButtonSaveCancel/ComboButton';
import DialogConfirm from 'components/DialogConfirm/DialogConfirm';
import FormVerticle from 'components/FormVerticle/FormVerticle';
import dayjs from 'dayjs';
import { isEmpty } from 'lodash-es';
import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Route } from 'services/models/Route';
import { Vehicle } from 'services/models/Vehicle';
import { toDayjs } from 'utils/toDayjs';
import EditPriceARoutePointNCreateTrip, { EditPriceARoutePointFormValues } from '../FormEditPrice/EditPriceARoutePointNCreateTrip';

const fieldKeys: Array<keyof Route | string> = ['vehicle', 'departurePoint', 'arrivalPoint', 'departureTime', 'arrivalDuration'];

export interface StepOneValuesForOneStopTrip extends EditPriceARoutePointFormValues {
  vehicle: Vehicle | null;
  departurePoint: string;
  arrivalPoint: string;
  departureTime: dayjs.Dayjs;
  arrivalDuration: dayjs.Dayjs;
}

export interface StepOneProps {
  onNextStep?: (values: StepOneValuesForOneStopTrip) => void;
  onCancel?: (values: StepOneValuesForOneStopTrip) => void;
  isEdit?: boolean;
  values?: Partial<StepOneValuesForOneStopTrip>;
  isLoading?: boolean;
}

export default function StepOne({ onNextStep, onCancel, isEdit, values, isLoading }: StepOneProps) {
  const { t } = useTranslation(['routers', 'translation']);
  const {
    control,
    formState: { errors },
    handleSubmit,
    getValues,
    reset,
    watch,
    resetField,
  } = useForm<StepOneValuesForOneStopTrip>();
  const vehicle = watch('vehicle');
  const departurePoint = watch('departurePoint');
  const arrivalPoint = watch('arrivalPoint');

  const [open, setOpen] = useState(false);

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
        [key]: t('translation:error_required', { name: t(`routers:${key}`).toLowerCase() }),
      };
    }, {});
  }, [t]);

  useEffect(() => {
    if (!!values && !isEmpty(values)) {
      reset({
        ...values,
        arrivalDuration: values.arrivalDuration,
        departureTime: toDayjs({ value: values.departureTime, format: 'DD-MM-YYY HH:mm' }),
        routePointId: values.routePointId,
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
            vehicle,
            onChange: vehicle => {
              resetField('vehicle', {
                defaultValue: vehicle as StepOneValuesForOneStopTrip['vehicle'],
              });
            },
            required: true,
          },
          {
            type: 'controlSelectDestination',
            label: 'departurePoint',
            id: 'departurePoint',
            destination: departurePoint,
            onChange: departurePoint => {
              resetField('departurePoint', {
                defaultValue: departurePoint as StepOneValuesForOneStopTrip['departurePoint'],
              });
            },
            required: true,
          },
          {
            id: 'departureTime',
            label: 'departureTime',
            type: 'datetime',
            showTime: true,
            required: true,
            format: 'DD-MM-YYYY HH:mm',
          },
          {
            id: 'arrivalPoint',
            label: 'arrivalPoint',
            type: 'controlSelectDestination',
            destination: arrivalPoint,
            onChange: arrivalPoint => {
              resetField('arrivalPoint', {
                defaultValue: arrivalPoint as StepOneValuesForOneStopTrip['arrivalPoint'],
              });
            },
            required: true,
          },
          {
            id: 'arrivalDuration',
            label: 'arrivalDuration',
            type: 'datetime',
            format: 'HH:mm',
            showTime: true,
            picker: 'time',
            required: true,
          },
        ]}
      />
      <Typography fontSize={14} color="#45485e" fontWeight={500} py="16px">
        {t('routers:config_prices_per_passenger')}
      </Typography>
      <EditPriceARoutePointNCreateTrip errors={errors} control={control as any} isMulti={false} />
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
