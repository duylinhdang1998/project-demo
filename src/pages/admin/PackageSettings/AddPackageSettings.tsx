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
import FormVerticle from 'components/FormVerticle/FormVerticle';
import HeaderLayout from 'components/HeaderLayout/HeaderLayout';
import ToastCustom from 'components/ToastCustom/ToastCustom';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { useAppSelector } from 'hooks/useAppSelector';
import { CreatePackageSetting } from 'services/PackageSettings/Company/createPackageSetting';
import { packageSettingsActions } from 'store/packageSettings/packageSettingsSlice';
import { selectPackageSettings } from 'store/packageSettings/selectors';
import { useToastStyle } from 'theme/toastStyles';
import { fieldsAddPackageSetting } from './constant';

const fieldKeys: Array<keyof CreatePackageSetting> = ['title', 'description'];

type Values = Record<typeof fieldKeys[number], string>;

export default function AddPackageSettings() {
  const toastClass = useToastStyle();
  const { t } = useTranslation(['packageSettings', 'translation']);
  const {
    control,
    formState: { errors },
    handleSubmit,
    setValue,
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
        [key]: t('translation:error_required', { name: key }),
      };
    }, {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isEditAction = useMemo(() => {
    return !!packageSettingId;
  }, [packageSettingId]);

  const handleClose = () => setOpenDialog(false);
  const handleCancel = () => setOpenDialog(true);

  const onSubmit = (values: Values) => {
    if (isEditAction && packageSettingId) {
      dispatch(
        packageSettingsActions.updatePackageSettingRequest({
          id: packageSettingId,
          data: {
            title: values.title,
            description: values.description,
          },
          onFailure: () => {
            toast(<ToastCustom type="error" text={t('translation:internal_server_error')} />, {
              className: toastClass.toastSuccess,
            });
          },
          onSuccess: () => {
            toast(<ToastCustom type="success" text={t('packageSettings:package_settings_updated')} />, {
              className: toastClass.toastSuccess,
            });
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
          onFailure: () => {
            toast(<ToastCustom type="error" text={t('translation:internal_server_error')} />, {
              className: toastClass.toastSuccess,
            });
          },
          onSuccess: () => {
            toast(<ToastCustom type="success" text={t('packageSettings:package_settings_created')} />, {
              className: toastClass.toastSuccess,
            });
            navigate('/admin/package-settings');
          },
        }),
      );
    }
  };

  useEffect(() => {
    if (isEditAction && packageSettingId) {
      dispatch(packageSettingsActions.getPackageSettingRequest({ id: packageSettingId }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEditAction]);

  useEffect(() => {
    if (isEditAction && packageSetting && statusGetPackageSetting === 'success') {
      Object.keys(packageSetting).forEach(key => {
        const key_ = key as keyof CreatePackageSetting;
        if (fieldKeys.includes(key_)) {
          setValue(key_, packageSetting[key_]);
        }
      });
    }
    if (isEditAction && !packageSetting && statusGetPackageSetting === 'success') {
      navigate('/404');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statusGetPackageSetting, packageSetting, isEditAction]);

  // FIXME: Retry screen

  return (
    <Box>
      <HeaderLayout
        subTitleHeader={t('packageSettings:package_settings')}
        activeSideBarHeader={
          isEditAction
            ? t('translation:edit_type', { type: t('packageSettings:package_settings_lowercase') })
            : t('translation:create_new', { type: t('packageSettings:package_settings_lowercase') })
        }
      />
      <Box padding="24px">
        <Stack direction={{ mobile: 'column', laptop: 'row' }} spacing={{ xs: '30px', lg: '60px' }}>
          <BackButton />
          <Box width="100%" display="flex" justifyContent="center">
            <Box bgcolor="#fff" borderRadius="4px" width={{ xs: '100%', md: '80%' }} padding="24px">
              <Typography color="#0c1132" fontWeight={700}>
                {t('translation:create_new', { type: t('packageSettings:package_settings_lowercase') })}
              </Typography>
              <Divider sx={{ margin: '16px 0' }} />
              <form onSubmitCapture={handleSubmit(onSubmit)}>
                <FormVerticle errors={errors} messages={messages} fields={fieldsAddPackageSetting} control={control} filterKey="packageSettings" />
                <ComboButton
                  isLoading={
                    packageSettingId
                      ? queueUpdatePackageSetting.includes(packageSettingId) || statusGetPackageSetting === 'loading'
                      : statusCreatePackageSetting === 'loading'
                  }
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
        title={t('translation:cancel_type', { type: t('packageSettings:package_settings_lowercase') })}
        subTitle={t('translation:leave_page')}
        onClose={handleClose}
      />
      {Notification}
    </Box>
  );
}
