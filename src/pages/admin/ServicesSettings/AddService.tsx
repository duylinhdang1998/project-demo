import { Divider, InputBase, InputLabel, Theme, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Box } from '@mui/system';
import Button from 'components/Button/Button';
import DialogConfirm from 'components/DialogConfirm/DialogConfirm';
import { FadeIn } from 'components/FadeIn/FadeIn';
import ListIcon from 'components/ListIcon/ListIcon';
import { LoadingScreen } from 'components/LoadingScreen/LoadingScreen';
import LayoutDetail from 'layout/LayoutDetail';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { useAddService, useGetDetailService, useUpdateServiceSetting } from 'services/ServiceSetting/Company/getServiceSettings';
import { getNotifcation } from 'utils/getNotification';

const useStyles = makeStyles((theme: Theme) => ({
  label: {
    fontSize: '14px !important',
    color: '#45485E',
    marginBottom: '4px',
  },
  inputSearch: {
    border: '1px solid #f7f7f7',
    borderRadius: '4px !important',
    backgroundColor: '#fff',
    padding: '12px 14px',
    height: '40px !important',
    fontSize: '14px !important',
  },
  error: {
    marginTop: '8px !important',
    color: theme.palette.error.main,
  },
}));

export interface Values {
  title: string;
  icon: string;
}

export default function AddService() {
  const params = useParams();
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
    getValues,
  } = useForm<Values>({
    mode: 'all',
  });

  const { t } = useTranslation(['serviceSetting', 'translation']);
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { run: addService, loading: addLoading } = useAddService({
    onSuccess: data => {
      getNotifcation({
        code: data.code,
        success: t('add_new_service_success'),
        error: t('add_new_service_error'),
        onSuccess: () => {
          navigate(-1);
          reset({
            title: '',
            icon: '',
          });
        },
      });
    },
  });

  const { run: getDetail, data: serviceDetails, loading } = useGetDetailService();
  const { run: updateService, loading: updateLoading } = useUpdateServiceSetting({
    onSuccess: data => {
      getNotifcation({
        code: data.code,
        success: t('edit_service_success'),
        error: t('edit_service_error'),
      });
    },
  });

  useEffect(() => {
    if (!!params.id) {
      getDetail(params.id);
    }
    /* eslint-disable react-hooks/exhaustive-deps */
  }, [params]);

  useEffect(() => {
    if (!!serviceDetails) {
      reset({
        title: serviceDetails.data.title,
        icon: serviceDetails.data.icon._id,
      });
    }
  }, [serviceDetails]);

  const onSave = (values: Values) => {
    if (!params.id) {
      addService({
        title: values.title,
        icon: values.icon,
      });
      return;
    }
    updateService(params.id, { title: values.title, icon: values.icon });
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCancel = () => setOpen(true);
  if (loading && !!params.id) {
    return <LoadingScreen />;
  }
  return (
    <LayoutDetail subTitle={t('service_settings')} title={t('translation:create_new', { type: t('translation:service') })}>
      <FadeIn>
        <Box width="100%" display="flex" justifyContent="center">
          <Box bgcolor="#fff" borderRadius="4px" width={{ xs: '100%', md: '80%' }} padding="24px">
            <Typography color="#0c1132" fontWeight={700}>
              {t(!params.id ? 'translation:add_new' : 'translation:edit_type', { type: t('translation:service') })}
            </Typography>
            <Divider sx={{ margin: '16px 0' }} />
            <Box>
              <InputLabel htmlFor="title" className={classes.label}>
                {t('service_title')}
              </InputLabel>
              <Controller
                control={control}
                name="title"
                defaultValue=""
                rules={{
                  required: {
                    value: true,
                    message: t('translation:error_required', { name: t('translation:title') }),
                  },
                }}
                render={({ field }) => <InputBase {...field} placeholder={t('service_title')} id="title" className={classes.inputSearch} fullWidth />}
              />
              {!!errors['title'] && (
                <Typography component="p" className={classes.error} fontSize={12}>
                  {errors['title']?.message}
                </Typography>
              )}
            </Box>
            <ListIcon
              props={{
                control,
                name: 'icon',
                rules: {
                  required: {
                    value: true,
                    message: t('translation:error_required', { name: t('translation:icon') }),
                  },
                },
              }}
              defaultIcon={getValues('icon')}
              isEdit={!!params.id}
            />
            <Box display="flex" justifyContent="flex-end" marginTop="24px">
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
                sx={{
                  margin: '0 8px',
                  width: 120,
                }}
                loading={!!params.id ? updateLoading : addLoading}
                onClick={handleSubmit(onSave)}
                variant="contained"
                backgroundButton="#1aa6ee"
              >
                {t('translation:save')}
              </Button>
            </Box>
          </Box>
        </Box>
      </FadeIn>
      <DialogConfirm
        title={t('translation:cancel_type', { type: t('translation:service') })}
        subTitle={t('translation:leave_page')}
        cancelButtonText={t('translation:no')}
        okButtonText={t('translation:yes')}
        openDialog={open}
        onClose={handleClose}
      />
    </LayoutDetail>
  );
}
