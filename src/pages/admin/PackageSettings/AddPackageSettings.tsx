import { Divider, Stack, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import BackButton from 'components/BackButton/BackButton';
import ComboButton from 'components/ComboButtonSaveCancel/ComboButton';
import DialogConfirm from 'components/DialogConfirm/DialogConfirm';
import { FadeIn } from 'components/FadeIn/FadeIn';
import FormVerticle from 'components/FormVerticle/FormVerticle';
import HeaderLayout from 'components/HeaderLayout/HeaderLayout';
import { LoadingScreen } from 'components/LoadingScreen/LoadingScreen';
import ToastCustom from 'components/ToastCustom/ToastCustom';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { useAppSelector } from 'hooks/useAppSelector';
import { CreatePackageSetting } from 'services/PackageSetting/Company/createPackageSetting';
import { packageSettingsActions } from 'store/packageSettings/packageSettingsSlice';
import { selectPackageSettings } from 'store/packageSettings/selectors';
import { fieldsAddPackageSetting } from './constant';
import { EmptyScreen } from 'components/EmptyScreen/EmptyScreen';

const fieldKeys: Array<keyof CreatePackageSetting> = ['title', 'description'];

type Values = Record<keyof CreatePackageSetting, string>;

export default function AddPackageSettings() {
  const { t } = useTranslation(['packageSettings', 'translation', 'message_error']);
  const {
    control,
    formState: { errors },
    handleSubmit,
    resetField,
    reset,
  } = useForm<Values>();
  const [openDialog, setOpenDialog] = useState(false);
  const dispatch = useAppDispatch();
  const { statusCreatePackageSetting, packageSetting, statusGetPackageSetting, queueUpdatePackageSetting } = useAppSelector(selectPackageSettings);
  const { packageSettingId } = useParams();
  const navigate = useNavigate();

  const messages = useMemo(() => {
    return fieldKeys.reduce<Record<string, string>>((res, key) => {
      return {
        ...res,
        [key]: t('translation:error_required', { name: t(`packageSettings:${key}`).toLowerCase() }),
      };
    }, {});
  }, [t]);

  const isEditAction = useMemo(() => {
    return !!packageSettingId;
  }, [packageSettingId]);

  const handleClose = () => setOpenDialog(false);
  const handleCancel = () => setOpenDialog(true);

  const onSubmit = (values: Values) => {
    if (isEditAction && packageSetting && packageSettingId) {
      dispatch(
        packageSettingsActions.updatePackageSettingRequest({
          id: packageSettingId,
          targetPackageSetting: packageSetting,
          data: {
            title: values.title,
            description: values.description,
          },
          onFailure: message => {
            toast(
              <ToastCustom
                type="error"
                text={t('translation:edit_type_error', {
                  type: t('packageSettings:package_settings').toLowerCase(),
                })}
                description={message}
              />,
              { className: 'toast-error' },
            );
          },
          onSuccess: () => {
            toast(
              <ToastCustom
                type="success"
                text={t('translation:edit_type_success', {
                  type: t('packageSettings:package_settings').toLowerCase(),
                })}
              />,
              { className: 'toast-success' },
            );
            navigate('/admin/package-settings', { replace: true });
          },
        }),
      );
    } else {
      dispatch(
        packageSettingsActions.createPackageSettingRequest({
          data: {
            title: values.title,
            description: values.description,
          },
          onFailure: message => {
            toast(
              <ToastCustom
                type="error"
                text={t('translation:add_type_error', { type: t('packageSettings:package_settings').toLowerCase() })}
                description={message}
              />,
              { className: 'toast-error' },
            );
          },
          onSuccess: () => {
            toast(
              <ToastCustom
                type="success"
                text={t('translation:add_type_success', {
                  type: t('packageSettings:package_settings').toLowerCase(),
                })}
              />,
              { className: 'toast-success' },
            );
            navigate('/admin/package-settings');
          },
        }),
      );
    }
  };

  useEffect(() => {
    if (isEditAction && packageSettingId) {
      reset();
      dispatch(packageSettingsActions.getPackageSettingRequest({ id: packageSettingId }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEditAction]);

  useEffect(() => {
    if (isEditAction && packageSetting && statusGetPackageSetting === 'success') {
      fieldKeys.forEach(key => {
        resetField(key, {
          defaultValue: packageSetting[key],
        });
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statusGetPackageSetting, packageSetting, isEditAction]);

  if (statusGetPackageSetting === 'loading') {
    return <LoadingScreen />;
  }

  if (statusGetPackageSetting === 'failure' || (statusGetPackageSetting === 'success' && !packageSetting)) {
    return <EmptyScreen description={t('message_error:PACKAGE_SETTING_NOT_FOUND')} />;
  }

  return (
    <FadeIn>
      <Box>
        <HeaderLayout
          subTitleHeader={t('packageSettings:package_settings')}
          activeSideBarHeader={
            isEditAction
              ? t('translation:edit_type', { type: t('packageSettings:package_settings').toLowerCase() })
              : t('packageSettings:create_package_setting')
          }
        />
        <Box padding="24px">
          <Stack direction={{ mobile: 'column', laptop: 'row' }} spacing={{ xs: '30px', lg: '60px' }}>
            <BackButton />
            <Box width="100%" display="flex" justifyContent="center">
              <Box bgcolor="#fff" borderRadius="4px" width={{ xs: '100%', md: '80%' }} padding="24px">
                <Typography color="#0c1132" fontWeight={700}>
                  {t('packageSettings:create_package_setting')}
                </Typography>
                <Divider sx={{ margin: '16px 0' }} />
                <form onSubmitCapture={handleSubmit(onSubmit)}>
                  <FormVerticle errors={errors} messages={messages} fields={fieldsAddPackageSetting} control={control} filterKey="packageSettings" />
                  <ComboButton
                    isSaving={packageSettingId ? queueUpdatePackageSetting.includes(packageSettingId) : statusCreatePackageSetting === 'loading'}
                    onCancel={handleCancel}
                    onSave={handleSubmit(onSubmit)}
                  />
                </form>
              </Box>
            </Box>
          </Stack>
        </Box>
        <DialogConfirm
          openDialog={openDialog}
          title={t('packageSettings:cancel_form')}
          subTitle={t('translation:leave_page')}
          onClose={handleClose}
        />
        {Notification}
      </Box>
    </FadeIn>
  );
}
