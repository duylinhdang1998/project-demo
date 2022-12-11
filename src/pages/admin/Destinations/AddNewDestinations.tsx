import { Box, Divider, Typography } from '@mui/material';
import ComboButton from 'components/ComboButtonSaveCancel/ComboButton';
import DialogConfirm from 'components/DialogConfirm/DialogConfirm';
import FormVerticle from 'components/FormVerticle/FormVerticle';
import LayoutDetail from 'layout/LayoutDetail';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { fieldsDestinations } from './constants';

export default function AddNewDestinations() {
  const { t } = useTranslation(['destinations', 'translation']);
  const { control } = useForm();
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };
  const handleCancel = () => setOpen(true);

  return (
    <LayoutDetail title={t('translation:create_new', { type: 'destinations' })}>
      <Box width="100%" display="flex" justifyContent="center">
        <Box bgcolor="#fff" borderRadius="4px" width={{ xs: '100%', md: '80%' }} padding="24px">
          <Typography color="#0c1132" fontWeight={700}>
            {t(`translation:add_new`, { type: t('destinations') })}
          </Typography>
          <Divider sx={{ margin: '16px 0' }} />
          <FormVerticle fields={fieldsDestinations} control={control} filterKey="destinations" />
          <ComboButton onCancel={handleCancel} />
        </Box>
      </Box>
      <DialogConfirm openDialog={open} title={t('translation:cancel_type', { type: t('destinations') })} subTitle={t('translation:leave_page')} onClose={handleClose} />
    </LayoutDetail>
  );
}
