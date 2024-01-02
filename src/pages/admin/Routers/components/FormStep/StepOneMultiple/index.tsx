import { Box } from '@mui/system';
import ComboButton from 'components/ComboButtonSaveCancel/ComboButton';
import DialogConfirm from 'components/DialogConfirm/DialogConfirm';
import FormVerticle from 'components/FormVerticle/FormVerticle';
import dayjs from 'dayjs';
import { isEmpty } from 'lodash-es';
import { useEffect, useMemo, useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Route, RoutePoint } from 'services/models/Route';
import { Vehicle } from 'services/models/Vehicle';
import { toDayjs } from 'utils/toDayjs';
import { EditPriceARoutePointFormValues } from '../../FormEditPrice/EditPriceARoutePointNCreateTrip';
import { StopPoints } from './components/StopPoints/StopPoints';
import { Result } from 'components/SelectDecouplingData/SelectDestination';

export interface RoutePointValues extends EditPriceARoutePointFormValues {
  stop_point: Result;
  duration: dayjs.Dayjs;
}
export interface StepOneValuesForMultipleStopTrip {
  vehicle: Vehicle | null;
  departurePoint: Result;
  departureTime: dayjs.Dayjs;
  routePoints: RoutePointValues[];
  routePointsDeleted: Array<RoutePoint['_id']>;
}
const fieldKeys: Array<keyof Route> = ['vehicle', 'departurePoint', 'departureTime'];

interface StepOneMultipleProps {
  onNextStep?: (values: StepOneValuesForMultipleStopTrip) => void;
  onCancel?: (values: StepOneValuesForMultipleStopTrip) => void;
  isEdit?: boolean;
  values?: Partial<StepOneValuesForMultipleStopTrip>;
  isLoading?: boolean;
}

export default function StepOneMultiple({ onCancel, onNextStep, isEdit, values, isLoading }: StepOneMultipleProps) {
  const { t } = useTranslation(['routers', 'translation']);
  const {
    control,
    formState: { errors },
    handleSubmit,
    getValues,
    setValue,
    trigger,
    reset,
    watch,
  } = useForm<StepOneValuesForMultipleStopTrip>({
    defaultValues: {
      routePointsDeleted: [],
      routePoints: [
        {
          duration: undefined,
          ecoAdult: undefined,
          ecoChildren: undefined,
          ecoStudent: undefined,
          routePointId: undefined,
          stop_point: undefined,
          vipAdult: undefined,
          vipChildren: undefined,
          vipStudent: undefined,
        },
      ],
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'routePoints',
  });
  const vehicle = watch('vehicle');
  const departurePoint = watch('departurePoint');

  const [open, setOpen] = useState(false);

  const handleClose = () => setOpen(false);

  const handleCancel = () => {
    setOpen(true);
    onCancel?.(getValues());
  };

  const handleSave = (values: StepOneValuesForMultipleStopTrip) => {
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
        routePointsDeleted: [],
        departureTime: toDayjs({ value: values.departureTime, format: 'DD-MM-YYY HH:mm' }),
        routePoints: values.routePoints?.map(routePoint => ({
          ...routePoint,
          duration: routePoint.duration,
        })),
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
              setValue('vehicle', vehicle as StepOneValuesForMultipleStopTrip['vehicle']);
              trigger('vehicle');
            },
            required: true,
          },
          {
            type: 'controlSelectDestination',
            label: 'departurePoint',
            id: 'departurePoint',
            destination: departurePoint,
            onChange: departurePoint => {
              setValue('departurePoint', departurePoint as StepOneValuesForMultipleStopTrip['departurePoint']);
              trigger('departurePoint');
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
        ]}
      />
      <StopPoints
        append={append}
        control={control}
        errors={errors}
        getValues={getValues}
        trigger={trigger}
        remove={remove}
        routePoints={fields}
        setValue={setValue}
        isEdit={isEdit}
      />
      <ComboButton isSaving={isLoading} textOk={t('translation:next')} onCancel={handleCancel} onSave={handleSubmit(handleSave)} />
      <DialogConfirm
        openDialog={open}
        title={isEdit ? t('translation:cancel_type', { type: t(`routers:edit_trip`).toLowerCase() }) : t('routers:cancel_form')}
        subTitle={t('translation:leave_page')}
        onClose={handleClose}
      />
    </Box>
  );
}
