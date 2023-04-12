import { Grid, Stack } from '@mui/material';
import { Box } from '@mui/system';
import Button from 'components/Button/Button';
import DialogConfirm from 'components/DialogConfirm/DialogConfirm';
import FormVerticle from 'components/FormVerticle/FormVerticle';
import ToastCustom from 'components/ToastCustom/ToastCustom';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { useAppSelector } from 'hooks/useAppSelector';
import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Vehicle } from 'services/models/Vehicle';
import { CreateVehicle } from 'services/Vehicle/Company/createVehicle';
import { selectAuth } from 'store/auth/selectors';
import { selectVehicles } from 'store/vehicles/selectors';
import { vehiclesActions } from 'store/vehicles/vehiclesSlice';
import { fieldsAdd } from '../constants';
import { Merchandises } from './Merchandises';
import { ServiceSettings } from './ServiceSettings';

const fieldKeys: Array<keyof CreateVehicle> = ['ECOseats', 'VIPseats', 'attach', 'brand', 'merchandises', 'model', 'registrationId', 'services'];

export interface Values {
  ECOseats: Vehicle['ECOseats'];
  VIPseats: Vehicle['VIPseats'];
  attach: Vehicle['attach'];
  brand: Vehicle['brand'];
  merchandises: Vehicle['merchandises'];
  model: Vehicle['model'];
  registrationId: Vehicle['registrationId'];
  services: Vehicle['services'];
}

function FormAddVehicle() {
  const {
    control,
    formState: { errors },
    handleSubmit,
    setValue,
    watch,
    reset,
  } = useForm<Values>({
    defaultValues: {
      ECOseats: 1,
      VIPseats: 1,
      merchandises: [],
      services: [],
    },
  });
  const attach = watch('attach');
  const services = watch('services');
  const merchandises = watch('merchandises');

  const { t } = useTranslation(['vehicles', 'translation']);

  const navigate = useNavigate();
  const { vehicleId } = useParams();

  const [open, setOpen] = useState(false);

  const { userInfo } = useAppSelector(selectAuth);
  const { statusCreateVehicle, statusGetVehicle, queueUpdateVehicle, vehicle } = useAppSelector(selectVehicles);
  const dispatch = useAppDispatch();

  const isAgent = userInfo?.role === 'agent';

  const messages = useMemo(() => {
    return fieldKeys.reduce<Record<string, string>>((res, key) => {
      return {
        ...res,
        [key]: t('translation:error_required', { name: key }),
      };
    }, {});
  }, [t]);

  const isEditAction = useMemo(() => {
    return !!vehicleId;
  }, [vehicleId]);

  const handleClose = () => setOpen(false);
  const handleCancel = () => setOpen(true);

  const onSubmit = (formValues: Values) => {
    if (isEditAction && vehicleId) {
      dispatch(
        vehiclesActions.updateVehicleRequest({
          data: formValues,
          id: vehicleId,
          onSuccess: () => {
            toast(<ToastCustom type="success" text={t('translation:edit_type_success', { type: t('vehicles:vehicle') })} />, {
              className: 'toast-success',
            });
            navigate(isAgent ? '/agent/vehicles' : '/admin/vehicles', { replace: true });
          },
          onFailure: () => {
            toast(<ToastCustom type="error" text={t('translation:edit_type_error', { type: t('vehicles:vehicle') })} />, {
              className: 'toast-error',
            });
          },
        }),
      );
    } else {
      dispatch(
        vehiclesActions.createVehicleRequest({
          data: formValues,
          onSuccess: () => {
            toast(<ToastCustom type="success" text={t('translation:add_type_success', { type: t('vehicles:vehicle') })} />, {
              className: 'toast-success',
            });
            navigate(isAgent ? '/agent/vehicles' : '/admin/vehicles', { replace: true });
          },
          onFailure: () => {
            toast(<ToastCustom type="error" text={t('translation:add_type_error', { type: t('vehicles:vehicle') })} />, {
              className: 'toast-error',
            });
          },
        }),
      );
    }
  };

  useEffect(() => {
    if (isEditAction && vehicle && statusGetVehicle === 'success') {
      reset({
        ECOseats: vehicle.ECOseats,
        VIPseats: vehicle.VIPseats,
        attach: vehicle.attach,
        brand: vehicle.brand,
        merchandises: vehicle.merchandises,
        model: vehicle.model,
        registrationId: vehicle.registrationId,
        services: vehicle.services,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statusGetVehicle, vehicle, isEditAction]);

  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <FormVerticle errors={errors} messages={messages} fields={fieldsAdd} control={control} filterKey="vehicles" />
        </Grid>
        <Grid item xs={12} md={6}>
          <ServiceSettings
            control={control}
            services={services}
            errors={errors}
            messages={messages}
            onChange={values => {
              setValue('services', values);
            }}
          />
          <Merchandises
            control={control}
            merchandises={merchandises}
            errors={errors}
            messages={messages}
            onChange={values => {
              setValue('merchandises', values);
            }}
          />
          <FormVerticle
            errors={errors}
            messages={messages}
            fields={[
              {
                id: 'attach',
                type: 'image_resource',
                label: 'attach',
                required: true,
                multiple: false,
                resources: typeof attach === 'object' ? [attach] : [],
                onChange: resources => {
                  const lastResource = resources[resources.length - 1];
                  setValue('attach', lastResource);
                },
              },
            ]}
            control={control}
            filterKey="vehicles"
          />
        </Grid>
      </Grid>
      <Stack direction="row" justifyContent="flex-end" alignItems="center" sx={{ marginTop: '30px' }}>
        <Button
          variant="outlined"
          sx={{
            margin: '0 8px',
            color: '#1AA6EE',
            width: 120,
          }}
          onClick={handleCancel}
        >
          {t('translation:cancel')}
        </Button>
        <Button
          loading={
            isEditAction && vehicleId ? queueUpdateVehicle.includes(vehicleId) || statusGetVehicle === 'loading' : statusCreateVehicle === 'loading'
          }
          sx={{
            margin: '0 8px',
            width: 120,
          }}
          onClick={handleSubmit(onSubmit)}
          variant="contained"
          backgroundButton="#1aa6ee"
        >
          {t('translation:save')}
        </Button>
      </Stack>
      <DialogConfirm
        openDialog={open}
        title={t('translation:cancel_type', { type: t('vehicles:vehicle') })}
        subTitle={t('translation:leave_page')}
        onClose={handleClose}
      />
    </Box>
  );
}

export default FormAddVehicle;
