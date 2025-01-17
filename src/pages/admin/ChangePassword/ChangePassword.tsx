import { Box, Divider, Typography } from '@mui/material';
import { get } from 'lodash-es';
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
import { FieldError, PASSWORD_VALID_PATTERN_MESSAGE } from 'components/InputAuth/FieldError';
import { isStrongPassword } from 'regexes/isStrongPassword';

const fieldChanges: Field[] = [
  {
    id: uuidv4(),
    required: true,
    label: 'currentPassword',
  },
  {
    id: uuidv4(),
    required: true,
    label: 'newPassword',
  },
  {
    id: uuidv4(),
    required: true,
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
    formState: { errors, isSubmitted },
    getValues,
    reset,
    watch,
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
              {fieldChanges.map(i => {
                const isNewPasswordField = i.label === 'newPassword';
                const isConfirmPasswordField = i.label === 'confirmPassword';
                return (
                  <InputAuth
                    control={control}
                    nameInput={i.label as (typeof keys)[number]}
                    labelText={t(`${i.label}`)}
                    id={i.label}
                    placeholder={t(`${i.label}`)}
                    type="password"
                    rules={{
                      ...(isConfirmPasswordField
                        ? {
                            validate: (val: string) => val === getValues('newPassword') || 'Confirm password does not match',
                          }
                        : {}),
                      ...(isNewPasswordField
                        ? {
                            pattern: {
                              value: isStrongPassword,
                              message: PASSWORD_VALID_PATTERN_MESSAGE,
                            },
                          }
                        : {}),
                    }}
                    error={
                      isNewPasswordField ? !!errors[i.label as (typeof keys)[number]] && isSubmitted : !!errors[i.label as (typeof keys)[number]]
                    }
                    messageErr={
                      isNewPasswordField
                        ? isSubmitted && <FieldError fieldMessage={errors.newPassword?.message} fieldValue={watch('newPassword')} />
                        : get(errors, `${i.label}.message`, '')
                    }
                  />
                );
              })}
            </Box>
            <ComboButton onCancel={handleCancel} onSave={handleSubmit(onSubmit)} isSaving={loading} />
          </Box>
        </Box>
      </Box>
      <DialogConfirm
        openDialog={open}
        title={t('translation:cancel_type', { type: t('account:change_pasword_action').toLowerCase() })}
        subTitle={t('translation:leave_page')}
        onClose={handleClose}
      />
    </Box>
  );
}
