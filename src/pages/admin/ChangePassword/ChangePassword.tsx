import { Box, Divider, Typography } from '@mui/material';
import ComboButton from 'components/ComboButtonSaveCancel/ComboButton';
import DialogConfirm from 'components/DialogConfirm/DialogConfirm';
import HeaderLayout from 'components/HeaderLayout/HeaderLayout';
import InputAuth from 'components/InputAuth/InputAuth';
import { get } from 'lodash';
import { Field } from 'models/Field';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { v4 as uuidv4 } from 'uuid';

const fieldChanges: Field[] = [
  {
    id: uuidv4(),
    label: 'current_password',
  },
  {
    id: uuidv4(),
    label: 'new_password',
  },
  {
    id: uuidv4(),
    label: 'confirm_password',
  },
];

const keys = ['current_password', 'new_password', 'confirm_password'] as const;

interface Values {
  current_password: string;
  new_password: string;
  confirm_password: string;
}

export default function ChangePassword() {
  const { t } = useTranslation(['account', 'translation']);
  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm<Values>({
    defaultValues: {
      current_password: '',
      new_password: '',
      confirm_password: '',
    },
    mode: 'all',
  });

  const [open, setOpen] = useState(false);

  const handleCancel = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const onSubmit = (values: Values) => {
    console.log({ errors });

    console.log({ values });
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
              {fieldChanges.map((i) => (
                <InputAuth
                  control={control}
                  nameInput={i.label as typeof keys[number]}
                  labelText={t(`${i.label}`)}
                  id={i.label}
                  placeholder={t(`${i.label}`)}
                  type="password"
                  rules={{
                    ...(i.label === 'confirm_password'
                      ? {
                          validate: (val: string) => val === getValues('new_password') || "Confirm password doesn't match",
                        }
                      : {}),
                  }}
                  error={!!errors[i.label as typeof keys[number]]}
                  messageErr={get(errors, `${i.label}.message`, '')}
                />
              ))}
            </Box>
            <ComboButton onCancel={handleCancel} onSave={handleSubmit(onSubmit)} />
          </Box>
        </Box>
      </Box>
      <DialogConfirm
        openDialog={open}
        title={t('translation:cancel_type', { type: t('new_password').toLowerCase() })}
        subTitle={t('translation:leave_page')}
        onClose={handleClose}
      />
    </Box>
  );
}
