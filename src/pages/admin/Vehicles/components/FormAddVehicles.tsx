import { Grid, InputLabel, Stack } from '@mui/material';
import { Box } from '@mui/system';
import { memo, useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import Button from 'components/Button/Button';
import DialogConfirm from 'components/DialogConfirm/DialogConfirm';
import FormVerticle from 'components/FormVerticle/FormVerticle';
import { useStyles } from 'components/FormVerticle/styles';
import ToastCustom from 'components/ToastCustom/ToastCustom';
import { UploadImageResource } from 'components/UploadImageResource/UploadImageResource';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { ImageResource } from 'services/models/Resource';
import { Vehicle } from 'services/models/Vehicle';
import { CreateVehicle } from 'services/Vehicle/Company/createVehicle';
import { selectVehicles } from 'store/vehicles/selectors';
import { vehiclesActions } from 'store/vehicles/vehiclesSlice';
import { useToastStyle } from 'theme/toastStyles';
import { fieldsAdd, fieldsAddRight } from '../constants';

const fieldKeys: Array<keyof CreateVehicle> = ['ECOseats', 'VIPseats', 'attach', 'brand', 'merchandises', 'model', 'registrationId', 'services'];

interface Values {
  ECOseats: Vehicle['ECOseats'];
  VIPseats: Vehicle['VIPseats'];
  attach?: Vehicle['attach'];
  brand: Vehicle['brand'];
  merchandises: Vehicle['merchandises'];
  model: Vehicle['model'];
  registrationId: Vehicle['registrationId'];
  services: Vehicle['services'];
}

function FormAddVehicles() {
  const classes = useStyles();
  const toastClass = useToastStyle();

  const {
    control,
    formState: { errors },
    handleSubmit,
    getValues,
    setValue,
  } = useForm<Values>({
    defaultValues: {
      ECOseats: 1,
      VIPseats: 1,
    },
  });
  const { t } = useTranslation(['vehicles', 'translation']);

  const navigate = useNavigate();
  const { vehicleId } = useParams();

  const [open, setOpen] = useState(false);

  const { statusCreateVehicle, statusGetVehicle, queueUpdateVehicle, vehicle } = useSelector(selectVehicles);
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
    return !!vehicleId;
  }, [vehicleId]);

  const handleClose = () => setOpen(false);
  const handleCancel = () => setOpen(true);

  const getAttach = (): ImageResource[] => {
    // getValues().attach return undefined mặc dù đã setValue ở useEffect
    if (isEditAction && (statusGetVehicle !== 'success' || !vehicle)) {
      return [];
    }
    if (isEditAction && vehicle && vehicle._id === vehicleId) {
      const attach = getValues().attach;
      return attach ? [attach] : vehicle.attach ? [vehicle.attach] : [];
    }
    const attach = getValues().attach;
    return attach ? [attach] : [];
  };

  const onSubmit = (value: Values) => {
    if (isEditAction && vehicleId) {
      dispatch(
        vehiclesActions.updateVehicleRequest({
          data: value,
          id: vehicleId,
          onSuccess: () => {
            toast(<ToastCustom type="success" text={t('vehicles:vehicle_updated')} />, {
              className: toastClass.toastSuccess,
            });
            navigate('/admin/vehicles', { replace: true });
          },
          onFailure: () => {
            toast(<ToastCustom type="error" text={t('translation:internal_server_error')} />, {
              className: toastClass.toastSuccess,
            });
          },
        }),
      );
    } else {
      dispatch(
        vehiclesActions.createVehicleRequest({
          data: value,
          onSuccess: () => {
            toast(<ToastCustom type="success" text={t('vehicles:vehicle_created')} />, {
              className: toastClass.toastSuccess,
            });
            navigate('/admin/vehicles', { replace: true });
          },
          onFailure: () => {
            toast(<ToastCustom type="error" text={t('translation:internal_server_error')} />, {
              className: toastClass.toastSuccess,
            });
          },
        }),
      );
    }
  };

  useEffect(() => {
    if (isEditAction && vehicleId) {
      dispatch(vehiclesActions.getVehicleRequest({ id: vehicleId }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEditAction]);

  useEffect(() => {
    if (isEditAction && vehicle && statusGetVehicle === 'success') {
      Object.keys(vehicle).forEach(key => {
        const key_ = key as keyof CreateVehicle;
        if (fieldKeys.includes(key_)) {
          setValue(key_, vehicle[key_], { shouldDirty: true });
        }
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
          <FormVerticle errors={errors} messages={messages} fields={fieldsAddRight} control={control} filterKey="vehicles" />
          <Box>
            <InputLabel className={classes.label}>{t('vehicles:attach_photo')}</InputLabel>
            <UploadImageResource
              multiple={false}
              resources={getAttach()}
              onChange={resources => {
                const lastResource = resources[resources.length - 1];
                setValue('attach', lastResource ? lastResource : undefined);
              }}
            />
          </Box>
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

export default memo(FormAddVehicles);
