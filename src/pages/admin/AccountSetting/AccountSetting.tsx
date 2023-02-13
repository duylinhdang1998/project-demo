import { Box, Divider, Grid, Typography } from '@mui/material';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import ComboButton from 'components/ComboButtonSaveCancel/ComboButton';
import DialogConfirm from 'components/DialogConfirm/DialogConfirm';
import FormVerticle from 'components/FormVerticle/FormVerticle';
import LayoutDetail from 'layout/LayoutDetail';
import { fieldAccount1, fieldAccount2, fieldAccount3, fieldAccount4, fieldAccount5, fieldKeys } from './constants';

type Values = Record<typeof fieldKeys[number], string>;

export default function AccountSetting() {
  const { control } = useForm<Values>();
  const [open, setOpen] = useState(false);
  const { t } = useTranslation(['account', 'translation']);

  const handleClose = () => {
    setOpen(false);
  };

  const handleCancel = () => setOpen(true);
  return (
    <LayoutDetail title={t('settings')}>
      <Box display="flex" justifyContent="center" width="100%">
        <Box padding="24px" sx={{ backgroundColor: '#fff' }} borderRadius="4px" width={{ xs: '100%', md: '80%' }}>
          <Typography fontSize={16} fontWeight="700">
            {t('my_company')}
          </Typography>
          <Divider sx={{ margin: '16px 0' }} />
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <FormVerticle control={control} fields={fieldAccount1} filterKey="account" />
              <FormVerticle control={control} grid fields={fieldAccount2} filterKey="account" />
              <FormVerticle control={control} fields={fieldAccount3} filterKey="account" />
              <FormVerticle control={control} grid fields={fieldAccount4} filterKey="account" />
            </Grid>
            <Grid item xs={12} md={6}>
              <FormVerticle control={control} fields={fieldAccount5} filterKey="account" />
            </Grid>
          </Grid>
          <ComboButton onCancel={handleCancel} />
        </Box>
      </Box>
      <DialogConfirm
        openDialog={open}
        title={t('translation:cancel_type', { type: t('account_settings').toLowerCase() })}
        subTitle={t('translation:leave_page')}
        onClose={handleClose}
      />
    </LayoutDetail>
  );
}
