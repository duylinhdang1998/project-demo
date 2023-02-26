import { Box, Divider, Grid, Typography } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import ComboButton from 'components/ComboButtonSaveCancel/ComboButton';
import DialogConfirm from 'components/DialogConfirm/DialogConfirm';
import FormVerticle from 'components/FormVerticle/FormVerticle';
import LayoutDetail from 'layout/LayoutDetail';
import { Profile } from 'models/Profile';
import { useAppSelector } from 'hooks/useAppSelector';
import { selectAuth } from 'store/auth/selectors';
import { LoadingScreen } from 'components/LoadingScreen/LoadingScreen';
import { FadeIn } from 'components/FadeIn/FadeIn';
import { currencyOptions } from './constants';
import { ImageResource } from 'services/models/Resource';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { authActions } from 'store/auth/authSlice';
import ToastCustom from 'components/ToastCustom/ToastCustom';
import { useToastStyle } from 'theme/toastStyles';
import { toast } from 'react-toastify';

type Values = Pick<Profile, 'email' | 'name' | 'address' | 'zipCode' | 'city' | 'country' | 'transportLicense' | 'logoImage' | 'profileImage'> & {
  currency: string;
};
const fieldKeys: Array<keyof Values> = ['name', 'address', 'zipCode', 'city', 'country', 'transportLicense', 'logoImage', 'profileImage'];

export default function AccountSetting() {
  const {
    control,
    formState: { errors },
    getValues,
    reset,
    resetField,
    setValue,
    handleSubmit,
  } = useForm<Values>();
  const [open, setOpen] = useState(false);
  const { t } = useTranslation(['account', 'translation']);
  const toastClass = useToastStyle();

  const { profile, statusLogin, statusUpdateProfile } = useAppSelector(selectAuth);
  const dispatch = useAppDispatch();

  const messages = useMemo(() => {
    return fieldKeys.reduce<Record<string, string>>((res, key) => {
      return {
        ...res,
        [key]: t('translation:error_required', { name: key }),
      };
    }, {});
  }, [t]);

  const getProfileImage = (): ImageResource[] => {
    const attach = getValues().profileImage;
    return attach ? [attach] : [];
  };

  const getLogoImage = (): ImageResource[] => {
    const attach = getValues().logoImage;
    return attach ? [attach] : [];
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCancel = () => setOpen(true);

  const onSubmit = (values: Values) => {
    dispatch(
      authActions.updateProfileRequest({
        data: values,
        onSuccess() {
          toast(<ToastCustom type="success" text={t('translation:edit_type_success', { type: t('account:profile') })} />, {
            className: toastClass.toastSuccess,
          });
        },
        onFailure: () => {
          toast(<ToastCustom type="error" text={t('translation:edit_type_error', { type: t('account:profile') })} />, {
            className: toastClass.toastError,
          });
        },
      }),
    );
  };

  useEffect(() => {
    if (profile) {
      reset({
        address: profile.address,
        city: profile.city,
        country: profile.country,
        logoImage: profile.logoImage,
        name: profile.name,
        profileImage: profile.profileImage,
        transportLicense: profile.transportLicense,
        zipCode: profile.zipCode,
        email: profile.email,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profile]);

  if (statusLogin === 'loading') {
    return <LoadingScreen />;
  }

  if (!profile) {
    return null;
  }

  return (
    <FadeIn>
      <LayoutDetail title={t('settings')}>
        <Box display="flex" justifyContent="center" width="100%">
          <Box padding="24px" sx={{ backgroundColor: '#fff' }} borderRadius="4px" width={{ xs: '100%', md: '80%' }}>
            <Typography fontSize={16} fontWeight="700">
              {t('my_company')}
            </Typography>
            <Divider sx={{ margin: '16px 0' }} />
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <FormVerticle
                  errors={errors}
                  messages={messages}
                  control={control}
                  fields={[
                    { id: 'name', label: 'name', type: 'text', required: true },
                    { id: 'address', label: 'address', type: 'text', required: true },
                  ]}
                  filterKey="account"
                />
                <FormVerticle
                  errors={errors}
                  messages={messages}
                  control={control}
                  grid
                  fields={[
                    { id: 'zipCode', label: 'zipCode', type: 'text', required: true },
                    { id: 'country', label: 'country', type: 'text', required: true },
                    { id: 'city', label: 'city', type: 'text', required: true },
                    { id: 'phone', label: 'phone', type: 'text', disabled: true },
                  ]}
                  filterKey="account"
                />
                <FormVerticle
                  errors={errors}
                  messages={messages}
                  control={control}
                  fields={[{ id: 'email', label: 'email', type: 'text', disabled: true }]}
                  filterKey="account"
                />
                <FormVerticle
                  errors={errors}
                  messages={messages}
                  control={control}
                  grid
                  fields={[
                    { id: 'transportLicense', label: 'transportLicense', type: 'text', required: true },
                    { id: 'currency', label: 'currency', type: 'select', options: currencyOptions, disabled: true },
                  ]}
                  filterKey="account"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <FormVerticle
                  errors={errors}
                  messages={messages}
                  control={control}
                  fields={[
                    {
                      id: 'profileImage',
                      label: 'profileImage',
                      type: 'image_resource',
                      multiple: false,
                      required: true,
                      onChange(resources) {
                        const lastResource = resources[resources.length - 1];
                        if (lastResource) {
                          resetField('profileImage', {
                            defaultValue: lastResource,
                          });
                        } else {
                          setValue('profileImage', undefined as any);
                        }
                      },
                      resources: getProfileImage(),
                    },
                    {
                      id: 'logoImage',
                      label: 'logoImage',
                      type: 'image_resource',
                      multiple: false,
                      required: true,
                      onChange(resources) {
                        const lastResource = resources[resources.length - 1];
                        if (lastResource) {
                          resetField('logoImage', {
                            defaultValue: lastResource,
                          });
                        } else {
                          setValue('logoImage', undefined as any);
                        }
                      },
                      resources: getLogoImage(),
                    },
                  ]}
                  filterKey="account"
                />
              </Grid>
            </Grid>
            <ComboButton isSaving={statusUpdateProfile === 'loading'} onCancel={handleCancel} onSave={handleSubmit(onSubmit)} />
          </Box>
        </Box>
        <DialogConfirm
          openDialog={open}
          title={t('translation:cancel_type', { type: t('account_settings').toLowerCase() })}
          subTitle={t('translation:leave_page')}
          onClose={handleClose}
        />
      </LayoutDetail>
    </FadeIn>
  );
}
