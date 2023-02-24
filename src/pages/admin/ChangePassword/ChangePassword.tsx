import { Box, Divider, Typography } from '@mui/material';
import { get } from 'lodash';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { v4 as uuidv4 } from 'uuid';
import ComboButton from 'components/ComboButtonSaveCancel/ComboButton';
import DialogConfirm from 'components/DialogConfirm/DialogConfirm';
import HeaderLayout from 'components/HeaderLayout/HeaderLayout';
import InputAuth from 'components/InputAuth/InputAuth';
import { Field } from 'models/Field';
import { useChangePassWord } from 'services/ChangePassword/changePassword';
import { getNotifcation } from 'utils/getNotification';

const fieldChanges: Field[] = [
  {
    id: uuidv4(),
    label: 'currentPassword',
  },
  {
    id: uuidv4(),
    label: 'newPassword',
  },
  {
    id: uuidv4(),
    label: 'confirmPassword',
  },
];

const keys = ['currentPassword', 'newPassword', 'confirmPassword'] as const;

interface Values {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export default function ChangePassword() {
  const { t } = useTranslation(['account', 'translation']);
  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
    reset,
  } = useForm<Values>({
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
    mode: 'all',
  });

  const { run: changePasswordRequest, loading } = useChangePassWord({
    onSuccess: data => {
      getNotifcation({
        code: data.code,
        success: t('change_pass_success'),
        error: t('change_pass_error'),
        onSuccess: () => {
          reset();
        },
      });
    },
  });

  const [open, setOpen] = useState(false);

  const handleCancel = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const onSubmit = (values: Values) => {
    changePasswordRequest({
      currentPassword: values.currentPassword,
      newPassword: values.newPassword,
    });
  };

  return (
    <Box>
      <HeaderLayout activeSideBarHeader={t('change_pass')} />
      <Box padding="24px">
        <Box display="flex" justifyContent="center" width="100%">
          <Box padding="24px" sx={{ backgroundColor: '#fff' }} borderRadius="4px" width={{ xs: '100%', md: '80%' }}>
            <Typography fontSize={16} fontWeight="700">
              {t('change_pass')}
            </Typography>
            <Divider sx={{ margin: '16px 0' }} />
            <Box>
              {fieldChanges.map(i => (
                <InputAuth
                  control={control}
                  nameInput={i.label as (typeof keys)[number]}
                  labelText={t(`${i.label}`)}
                  id={i.label}
                  placeholder={t(`${i.label}`)}
                  type="password"
                  rules={{
                    ...(i.label === 'confirmPassword'
                      ? {
                          validate: (val: string) => val === getValues('newPassword') || "Confirm password doesn't match",
                        }
                      : {}),
                  }}
                  error={!!errors[i.label as (typeof keys)[number]]}
                  messageErr={get(errors, `${i.label}.message`, '')}
                />
              ))}
            </Box>
            <ComboButton onCancel={handleCancel} onSave={handleSubmit(onSubmit)} isSaving={loading} />
          </Box>
        </Box>
      </Box>
      <DialogConfirm
        openDialog={open}
        title={t('translation:cancel_type', { type: t('newPassword').toLowerCase() })}
        subTitle={t('translation:leave_page')}
        onClose={handleClose}
      />
    </Box>
  );
}
