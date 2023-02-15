import { Box } from '@mui/material';
import 'antd/lib/upload/style/css';
import { memo, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { v4 } from 'uuid';
import ComboButton from 'components/ComboButtonSaveCancel/ComboButton';
import DialogConfirm from 'components/DialogConfirm/DialogConfirm';
import FormVerticle from 'components/FormVerticle/FormVerticle';
import ToastCustom from 'components/ToastCustom/ToastCustom';
import { PDFResource } from 'services/models/Resource';
import { VehicleEvent } from 'services/models/Vehicle';
import { CreateVehicleEvent } from 'services/Vehicle/Company/createVehicleEvent';
import { selectVehicleEvents } from 'store/vehicles/selectors';
import { vehicleEventsActions } from 'store/vehicles/vehicleEventsSlice';
import { useToastStyle } from 'theme/toastStyles';
import { fieldsAddEvent } from '../constants';

const fieldKeys: Array<keyof CreateVehicleEvent> = ['reminderDate', 'fuelFees', 'fuelFees', 'extraFees', 'description', 'attach'];

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
  const {
    control,
    formState: { errors },
    handleSubmit,
    getValues,
    setValue,
  } = useForm<Values>();

  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  const { statusCreateVehicleEvent } = useSelector(selectVehicleEvents);
  const dispatch = useDispatch();

  const messages = useMemo(() => {
    return fieldKeys.reduce<Record<string, string>>((res, key) => {
      return {
        ...res,
        [key]: t('translation:error_required', { name: key }),
      };
    }, {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getAttach = (): PDFResource[] => {
    const attach = getValues().attach_document;
    return attach ? [attach] : [];
  };

  const handleCancel = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const onSubmit = (value: Values) => {
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
          },
          onSuccess() {
            toast(<ToastCustom type="success" text={t('vehicles:vehicle_event_created')} />, {
              className: toastClass.toastSuccess,
            });
            navigate('/admin/vehicles');
          },
          onFailure() {
            toast(<ToastCustom type="error" text={t('translation:internal_server_error')} />, {
              className: toastClass.toastError,
            });
          },
        }),
      );
    }
  };

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
      <ComboButton onCancel={handleCancel} isLoading={statusCreateVehicleEvent === 'loading'} onSave={handleSubmit(onSubmit)} />
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
