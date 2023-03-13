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
import { ImageResource } from 'services/models/Resource';
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
    getValues,
    resetField,
    reset,
    setValue,
  } = useForm<Values>({
    defaultValues: {
      ECOseats: 1,
      VIPseats: 1,
      merchandises: [],
      services: [],
    },
  });
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

  const getAttach = (): ImageResource[] => {
    const attach = getValues().attach;
    return attach ? [attach] : [];
  };

  const getServices = (): Vehicle['services'] => {
    return getValues().services ?? [];
  };

  const getMerchandises = (): Vehicle['merchandises'] => {
    return getValues().merchandises ?? [];
  };

  const onSubmit = (formValues: Values) => {
    console.log(formValues);
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
    if (isEditAction && vehicleId) {
      reset({ ECOseats: 1, VIPseats: 1 });
      dispatch(vehiclesActions.getVehicleRequest({ id: vehicleId }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEditAction]);

  useEffect(() => {
    if (isEditAction && vehicle && statusGetVehicle === 'success') {
      fieldKeys.forEach(key => {
        resetField(key, {
          defaultValue: vehicle[key],
        });
      });
    }
    if (isEditAction && !vehicle && statusGetVehicle === 'success') {
      navigate('/404');
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
            services={getServices()}
            errors={errors}
            messages={messages}
            onChange={values => {
              resetField('services', {
                defaultValue: values,
              });
            }}
          />
          <Merchandises
            control={control}
            merchandises={getMerchandises()}
            errors={errors}
            messages={messages}
            onChange={values => {
              resetField('merchandises', {
                defaultValue: values,
              });
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
                resources: getAttach(),
                onChange: resources => {
                  const lastResource = resources[resources.length - 1];
                  if (lastResource) {
                    resetField('attach', {
                      defaultValue: lastResource,
                    });
                  } else {
                    setValue('attach', undefined as any);
                  }
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
