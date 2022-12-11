import { Box, Divider, Typography } from '@mui/material';
import ComboButton from 'components/ComboButtonSaveCancel/ComboButton';
import DialogConfirm from 'components/DialogConfirm/DialogConfirm';
import FormVerticle from 'components/FormVerticle/FormVerticle';
import LayoutDetail from 'layout/LayoutDetail';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { fieldsAddOffice1, fieldsAddOffice2, fieldsAddOffice3 } from './constants';

const fieldKey = ['office_title', 'address', 'zip_code', 'country', 'city', 'phone_number', 'email'] as const;

type Values = Record<typeof fieldKey[number], string>;

export default function AddOfficeManager() {
  const { t } = useTranslation();
  const { control } = useForm<Values>();
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };
  const handleCancel = () => setOpen(true);

  return (
    <LayoutDetail subTitle={t('account.offices_manager')} title={t('create_new', { type: 'office' })}>
      <Box width="100%" display="flex" justifyContent="center">
        <Box bgcolor="#fff" borderRadius="4px" width={{ xs: '100%', md: '80%' }} padding="24px">
          <Typography color="#0c1132" fontWeight={700}>
            {t(`add_new`, { type: 'office' })}
          </Typography>
          <Divider sx={{ margin: '16px 0' }} />
          <FormVerticle fields={fieldsAddOffice1} control={control} filterKey="account" />
          <FormVerticle fields={fieldsAddOffice2} control={control} grid filterKey="account" />
          <FormVerticle fields={fieldsAddOffice3} control={control} filterKey="account" />
          <ComboButton onCancel={handleCancel} />
        </Box>
      </Box>
      <DialogConfirm openDialog={open} title={t('cancel_type', { type: 'office' })} subTitle={t('leave_page')} onClose={handleClose} />
    </LayoutDetail>
  );
}
