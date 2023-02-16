import { Box } from '@mui/material';
import 'antd/lib/upload/style/css';
import moment from 'moment';
import { memo, useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { v4 } from 'uuid';
import ComboButton from 'components/ComboButtonSaveCancel/ComboButton';
import DialogConfirm from 'components/DialogConfirm/DialogConfirm';
import FormVerticle from 'components/FormVerticle/FormVerticle';
import ToastCustom from 'components/ToastCustom/ToastCustom';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { useAppSelector } from 'hooks/useAppSelector';
import { PDFResource } from 'services/models/Resource';
import { VehicleEvent } from 'services/models/Vehicle';
import { CreateVehicleEvent } from 'services/Vehicle/Company/createVehicleEvent';
import { selectAuth } from 'store/auth/selectors';
import { selectVehicleEvents } from 'store/vehicles/selectors';
import { vehicleEventsActions } from 'store/vehicles/vehicleEventsSlice';
import { useToastStyle } from 'theme/toastStyles';
import { fieldsAddEvent } from '../constants';

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
  reminderDate: any;
  totalKilometers: VehicleEvent['totalKilometers'];
  fuelFees: VehicleEvent['fuelFees'];
  extraFees: VehicleEvent['extraFees'];
  description: VehicleEvent['description'];
  attach_document?: VehicleEvent['attach'];
}

function FormAddEvent() {
  const toastClass = useToastStyle();
  const { t } = useTranslation(['vehicles', 'translation']);

  const navigate = useNavigate();
  const { vehicleId, vehicleEventId } = useParams();

  const {
    control,
    formState: { errors },
    handleSubmit,
    getValues,
    setValue,
    resetField,
  } = useForm<Values>();

  const [open, setOpen] = useState(false);

  const { userInfo } = useAppSelector(selectAuth);
  const { statusCreateVehicleEvent, queueUpdateVehicleEvent, statusGetVehicleEvent, vehicleEvent } = useAppSelector(selectVehicleEvents);
  const dispatch = useAppDispatch();

  const messages = useMemo(() => {
    return fieldKeys.reduce<Record<string, string>>((res, key) => {
      return {
        ...res,
        [key]: t('translation:error_required', { name: key }),
      };
    }, {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isEditAction = useMemo(() => {
    return !!vehicleEventId;
  }, [vehicleEventId]);

  const isAgent = userInfo?.role === 'agent';

  const getAttach = (): PDFResource[] => {
    const attach = getValues().attach_document;
    return attach ? [attach] : [];
  };

  const handleCancel = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const onSubmit = (value: Values) => {
    if (isEditAction && vehicleEventId && vehicleId) {
      if (value.attach_document) {
        dispatch(
          vehicleEventsActions.updateVehicleEventRequest({
            id: vehicleEventId,
            data: {
              attach: value.attach_document,
              description: value.description,
              extraFees: value.extraFees,
              fuelFees: value.fuelFees,
              reminderDate: (value.reminderDate as moment.Moment).valueOf(),
              totalKilometers: value.totalKilometers,
              vehicle: vehicleId,
            },
            onSuccess() {
              toast(<ToastCustom type="success" text={t('vehicles:vehicle_event_created')} />, {
                className: toastClass.toastSuccess,
              });
              navigate(isAgent ? `/agent/${vehicleId}/list-events` : `/admin/${vehicleId}/list-events`);
            },
            onFailure() {
              toast(<ToastCustom type="error" text={t('translation:internal_server_error')} />, {
                className: toastClass.toastError,
              });
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
              reminderDate: (value.reminderDate as moment.Moment).valueOf(),
              totalKilometers: value.totalKilometers,
              vehicle: vehicleId,
            },
            onSuccess() {
              toast(<ToastCustom type="success" text={t('vehicles:vehicle_event_created')} />, {
                className: toastClass.toastSuccess,
              });
              navigate(`/admin/${vehicleId}/list-events`);
            },
            onFailure() {
              toast(<ToastCustom type="error" text={t('translation:internal_server_error')} />, {
                className: toastClass.toastError,
              });
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
          defaultValue: key_ === 'reminderDate' ? moment(vehicleEvent[key_]) : vehicleEvent[key_],
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
          fields={[{ type: 'textarea', placeholder: t(`description`), id: 'description', label: 'description' }]}
          filterKey="vehicles"
        />
      </Box>
      <Box my="16px">
        <FormVerticle
          control={control}
          fields={[
            {
              id: v4(),
              type: 'pdf_resource',
              label: 'attach_document',
              required: true,
              multiple: false,
              resources: getAttach(),
              onChange: resources => {
                const lastResource = resources[resources.length - 1];
                setValue('attach_document', lastResource ? lastResource : undefined);
              },
              buttonText: t('vehicles:attach_document'),
            },
          ]}
          filterKey="vehicles"
        />
      </Box>
      <ComboButton
        onCancel={handleCancel}
        isLoading={
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
