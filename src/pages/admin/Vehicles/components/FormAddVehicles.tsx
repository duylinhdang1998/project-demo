import { Grid, Stack } from '@mui/material';
import { Box } from '@mui/system';
import Button from 'components/Button/Button';
import DialogConfirm from 'components/DialogConfirm/DialogConfirm';
import FormVerticle from 'components/FormVerticle/FormVerticle';
import React, { memo } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { fieldsAdd, fieldsAddRight } from '../constants';

interface Values {
  brand: string;
  model: string;
  registration_id: string;
  eco_seats: string;
  vip_seats: string;
  services: string[];
  merchandises: string[];
}

function FormAddVehicles() {
  const { control, handleSubmit } = useForm<Values>();
  const { t } = useTranslation(['vehicles', 'translation']);
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleCancel = () => setOpen(true);

  const onSubmit = (value: Values) => {
    console.log({ value });
  };

  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <FormVerticle fields={fieldsAdd} control={control} filterKey="vehicles" />
        </Grid>
        <Grid item xs={12} md={6}>
          <FormVerticle fields={fieldsAddRight} control={control} filterKey="vehicles" />
        </Grid>
      </Grid>
      <Stack direction="row" justifyContent="flex-end" alignItems="center" sx={{ marginTop: '30px' }}>
        <Button
          variant="outlined"
          sx={{
            margin: '0 8px',
            color: '#1AA6EE',
            width: 120,
          }}
          onClick={handleCancel}>
          {t('translation:cancel')}
        </Button>
        <Button
          sx={{
            margin: '0 8px',
            width: 120,
          }}
          onClick={handleSubmit(onSubmit)}
          variant="contained"
          backgroundButton="#1aa6ee">
          {t('translation:save')}
        </Button>
      </Stack>
      <DialogConfirm openDialog={open} title={t('translation:cancel_type', { type: t('vehicle') })} subTitle={t('translation:leave_page')} onClose={handleClose} />
    </Box>
  );
}

export default memo(FormAddVehicles);
