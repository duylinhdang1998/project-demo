import { Box } from '@mui/material';
import 'antd/lib/upload/style/css';
import { memo, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { v4 } from 'uuid';
import ComboButton from 'components/ComboButtonSaveCancel/ComboButton';
import DialogConfirm from 'components/DialogConfirm/DialogConfirm';
import FormVerticle from 'components/FormVerticle/FormVerticle';
import { PDFResource } from 'services/models/Resource';
import { VehicleEvent } from 'services/models/Vehicle';
import { CreateVehicleEvent } from 'services/Vehicle/Company/createVehicleEvent';
import { selectVehicleEvents } from 'store/vehicles/selectors';
import { fieldsAddEvent } from '../constants';

const fieldKeys: Array<keyof CreateVehicleEvent> = ['reminderDate', 'fuelFees', 'fuelFees', 'extraFees', 'description', 'attach'];

export interface Values {
  reminderDate: VehicleEvent['reminderDate'];
  totalKilometers: VehicleEvent['totalKilometers'];
  fuelFees: VehicleEvent['fuelFees'];
  extraFees: VehicleEvent['extraFees'];
  description: VehicleEvent['description'];
  attach?: VehicleEvent['attach'];
}

function FormAddEvent() {
  const { t } = useTranslation(['vehicles', 'translation']);
  const {
    control,
    formState: { errors },
    handleSubmit,
    getValues,
    setValue,
  } = useForm<Values>();

  const [open, setOpen] = useState(false);
  const handleCancel = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { statusCreateVehicleEvent } = useSelector(selectVehicleEvents);

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
    const attach = getValues().attach;
    return attach ? [attach] : [];
  };

  const onSubmit = (value: Values) => {
    console.log(value);
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
                setValue('attach', lastResource ? lastResource : undefined);
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
