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
import { LoadingScreen } from 'components/LoadingScreen/LoadingScreen';
import { FadeIn } from 'components/FadeIn/FadeIn';
import { useAppDispatch } from 'hooks/useAppDispatch';
import ToastCustom from 'components/ToastCustom/ToastCustom';
import { toast } from 'react-toastify';
import { omit } from 'lodash-es';
import { selectProfile } from 'store/profile/selectors';
import { profileActions } from 'store/profile/profileSlice';

type Values = Pick<
  Profile,
  'email' | 'phone' | 'name' | 'address' | 'zipCode' | 'city' | 'country' | 'transportLicense' | 'logoImage' | 'profileImage'
>;

const fieldKeys: Array<keyof Values> = ['name', 'phone', 'address', 'zipCode', 'city', 'country', 'transportLicense', 'logoImage', 'profileImage'];

export default function AccountSetting() {
  const {
    control,
    formState: { errors },
    reset,
    resetField,
    setValue,
    trigger,
    handleSubmit,
    watch,
  } = useForm<Values>();
  const profileImage = watch('profileImage');
  const logoImage = watch('logoImage');

  const [open, setOpen] = useState(false);
  const { t } = useTranslation(['account', 'translation']);

  const { profile, statusGetProfile, statusUpdateProfile } = useAppSelector(selectProfile);
  const dispatch = useAppDispatch();

  const messages = useMemo(() => {
    return fieldKeys.reduce<Record<string, string>>((res, key) => {
      return {
        ...res,
        [key]: t('translation:error_required', { name: t(`account:${key}`).toLowerCase() }),
      };
    }, {});
  }, [t]);

  const handleClose = () => {
    setOpen(false);
  };

  const handleCancel = () => setOpen(true);

  const onSubmit = (values: Values) => {
    if (profile) {
      dispatch(
        profileActions.updateProfileRequest({
          data: omit(values, ['email']),
          targetProfile: profile,
          onSuccess() {
            toast(
              <ToastCustom
                type="success"
                text={t('translation:edit_type_success', {
                  type: t('account:profile').toLowerCase(),
                })}
              />,
              { className: 'toast-success' },
            );
          },
          onFailure: message => {
            toast(
              <ToastCustom
                type="error"
                text={t('translation:edit_type_error', {
                  type: t('account:profile').toLowerCase(),
                })}
                description={message}
              />,
              { className: 'toast-error' },
            );
          },
        }),
      );
    }
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
        phone: profile.phone,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profile]);

  if (statusGetProfile === 'loading') {
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
              <Grid item xs={12} md={8}>
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
                    { id: 'phone', label: 'phone', type: 'text', required: true },
                  ]}
                  filterKey="account"
                />
                <FormVerticle
                  errors={errors}
                  messages={messages}
                  control={control}
                  fields={[{ id: 'email', label: 'email', type: 'text', disabled: true, required: true }]}
                  filterKey="account"
                />
                <FormVerticle
                  errors={errors}
                  messages={messages}
                  control={control}
                  fields={[{ id: 'transportLicense', label: 'transportLicense', type: 'text', required: true }]}
                  filterKey="account"
                />
              </Grid>
              <Grid item xs={12} md={4}>
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
                      withFileInfomation: true,
                      onChange(resources) {
                        const lastResource = resources[resources.length - 1];
                        if (lastResource) {
                          resetField('profileImage', {
                            defaultValue: lastResource,
                          });
                        } else {
                          setValue('profileImage', undefined as any);
                        }
                        trigger('profileImage');
                      },
                      resources: profileImage ? [profileImage] : [],
                    },
                    {
                      id: 'logoImage',
                      label: 'logoImage',
                      type: 'image_resource',
                      multiple: false,
                      required: true,
                      withFileInfomation: true,
                      onChange(resources) {
                        const lastResource = resources[resources.length - 1];
                        if (lastResource) {
                          resetField('logoImage', {
                            defaultValue: lastResource,
                          });
                        } else {
                          setValue('logoImage', undefined as any);
                        }
                        trigger('logoImage');
                      },
                      resources: logoImage ? [logoImage] : [],
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
