import { Box } from '@mui/material';
import 'antd/lib/upload/style/css';
import ComboButton from 'components/ComboButtonSaveCancel/ComboButton';
import DialogConfirm from 'components/DialogConfirm/DialogConfirm';
import FormVerticle from 'components/FormVerticle/FormVerticle';
import ToastCustom from 'components/ToastCustom/ToastCustom';
import dayjs from 'dayjs';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { useAppSelector } from 'hooks/useAppSelector';
import { memo, useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { VehicleEvent } from 'services/models/Vehicle';
import { CreateVehicleEvent } from 'services/Vehicle/Company/createVehicleEvent';
import { selectAuth } from 'store/auth/selectors';
import { selectVehicleEvents } from 'store/vehicles/selectors';
import { vehicleEventsActions } from 'store/vehicles/vehicleEventsSlice';
import { dayjsToNumber } from 'utils/dayjsToNumber';
import { toDayjs } from 'utils/toDayjs';
import { fieldsAddEvent } from '../constants';
import { UserRole } from 'utils/constant';

const fieldKeys: Array<keyof Omit<CreateVehicleEvent, 'vehicle'>> = [
  'reminderDate',
  'fuelFees',
  'fuelFees',
  'extraFees',
  'description',
  'attach',
  'totalKilometers',
];

export interface Values {
  reminderDate: dayjs.Dayjs;
  totalKilometers: VehicleEvent['totalKilometers'];
  fuelFees: VehicleEvent['fuelFees'];
  extraFees: VehicleEvent['extraFees'];
  description: VehicleEvent['description'];
  attach_document?: VehicleEvent['attach'];
}

function FormAddEvent() {
  const { t } = useTranslation(['vehicles', 'translation']);

  const navigate = useNavigate();
  const { vehicleId, vehicleEventId } = useParams();

  const {
    control,
    formState: { errors },
    handleSubmit,
    resetField,
    setValue,
    trigger,
    watch,
  } = useForm<Values>();
  const attach = watch('attach_document');

  const [open, setOpen] = useState(false);

  const { userInfo } = useAppSelector(selectAuth);
  const { statusCreateVehicleEvent, queueUpdateVehicleEvent, statusGetVehicleEvent, vehicleEvent } = useAppSelector(selectVehicleEvents);
  const dispatch = useAppDispatch();

  const messages = useMemo(() => {
    return fieldKeys.reduce<Record<string, string>>((res, key) => {
      if (key === 'attach') {
        return {
          ...res,
          attach_document: t('translation:error_required', { name: t(`vehicles:attach_document`).toLowerCase() }),
        };
      }
      return {
        ...res,
        [key]: t('translation:error_required', { name: t(`vehicles:${key}`).toLowerCase() }),
      };
    }, {});
  }, [t]);

  const isEditAction = useMemo(() => {
    return !!vehicleEventId;
  }, [vehicleEventId]);

  const isAgent = userInfo?.role === UserRole.AGENT;

  const handleCancel = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const onSubmit = (value: Values) => {
    if (isEditAction && vehicleEvent && vehicleEventId && vehicleId) {
      if (value.attach_document) {
        dispatch(
          vehicleEventsActions.updateVehicleEventRequest({
            id: vehicleEventId,
            targetVehicleEvent: vehicleEvent,
            data: {
              attach: value.attach_document,
              description: value.description,
              extraFees: value.extraFees,
              fuelFees: value.fuelFees,
              reminderDate: dayjsToNumber(value.reminderDate),
              totalKilometers: value.totalKilometers,
              vehicle: vehicleEvent.vehicle,
            },
            onSuccess() {
              toast(
                <ToastCustom
                  type="success"
                  text={t('translation:edit_type_success', {
                    type: t('vehicles:event').toLowerCase(),
                  })}
                />,
                { className: 'toast-success' },
              );
              navigate(isAgent ? `/agent/vehicles/${vehicleId}/list-events` : `/admin/vehicles/${vehicleId}/list-events`);
            },
            onFailure: message => {
              toast(
                <ToastCustom
                  type="error"
                  text={t('translation:edit_type_error', { type: t('vehicles:event').toLowerCase() })}
                  description={message}
                />,
                { className: 'toast-error' },
              );
            },
          }),
        );
      }
    } else if (vehicleId) {
      if (value.attach_document) {
        dispatch(
          vehicleEventsActions.createVehicleEventRequest({
            data: {
              attach: value.attach_document,
              description: value.description,
              extraFees: value.extraFees,
              fuelFees: value.fuelFees,
              reminderDate: dayjsToNumber(value.reminderDate),
              totalKilometers: value.totalKilometers,
              vehicle: vehicleId,
            },
            onSuccess() {
              toast(
                <ToastCustom
                  type="success"
                  text={t('translation:add_type_success', {
                    type: t('vehicles:event').toLowerCase(),
                  })}
                />,
                { className: 'toast-success' },
              );
              navigate(isAgent ? `/agent/vehicles/${vehicleId}/list-events` : `/admin/vehicles/${vehicleId}/list-events`);
            },
            onFailure: message => {
              toast(
                <ToastCustom
                  type="error"
                  text={t('translation:add_type_error', {
                    type: t('vehicles:event').toLowerCase(),
                  })}
                  description={message}
                />,
                { className: 'toast-error' },
              );
            },
          }),
        );
      }
    }
  };

  useEffect(() => {
    if (isEditAction && vehicleEvent && statusGetVehicleEvent === 'success') {
      fieldKeys.forEach(key => {
        const key_ = key;
        resetField(key_ === 'attach' ? 'attach_document' : key_, {
          defaultValue: key_ === 'reminderDate' ? toDayjs({ value: vehicleEvent[key_] }) : vehicleEvent[key_],
        });
      });
    }
    if (isEditAction && !vehicleEvent && statusGetVehicleEvent === 'success') {
      navigate('/404');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statusGetVehicleEvent]);

  return (
    <Box>
      <FormVerticle errors={errors} messages={messages} control={control} fields={fieldsAddEvent} filterKey="vehicles" grid />
      <Box my="16px">
        <FormVerticle
          errors={errors}
          messages={messages}
          control={control}
          fields={[{ id: 'description', type: 'textarea', placeholder: t('vehicles:description'), label: 'description', required: true }]}
          filterKey="vehicles"
        />
      </Box>
      <Box my="16px">
        <FormVerticle
          errors={errors}
          messages={messages}
          control={control}
          fields={[
            {
              id: 'attach_document',
              type: 'pdf_resource',
              label: 'attach_document',
              required: true,
              multiple: false,
              resources: attach ? [attach] : [],
              onChange: resources => {
                const lastResource = resources[resources.length - 1];
                setValue('attach_document', lastResource);
                trigger('attach_document');
              },
              buttonText: t('vehicles:attach_document'),
            },
          ]}
          filterKey="vehicles"
        />
      </Box>
      <ComboButton
        onCancel={handleCancel}
        isSaving={
          statusCreateVehicleEvent === 'loading' || statusGetVehicleEvent === 'loading' || queueUpdateVehicleEvent.includes(vehicleEventId ?? '')
        }
        onSave={handleSubmit(onSubmit)}
      />
      <DialogConfirm
        openDialog={open}
        title={t('translation:cancel_type', { type: t('translation:event').toLowerCase() })}
        subTitle={t('translation:leave_page')}
        onClose={handleClose}
      />
    </Box>
  );
}

export default memo(FormAddEvent);
