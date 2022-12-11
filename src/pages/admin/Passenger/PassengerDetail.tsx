import { Box, Divider, Grid, Typography } from '@mui/material';
import ComboButton from 'components/ComboButtonSaveCancel/ComboButton';
import DialogConfirm from 'components/DialogConfirm/DialogConfirm';
import FormVerticle from 'components/FormVerticle/FormVerticle';
import dayjs from 'dayjs';
import LayoutDetail from 'layout/LayoutDetail';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import TableDetailPassenger from './components/TableDetailPassenger';
import { fieldDetails } from './constants';

interface Values {
  lastName: string;
  firstName: string;
  email: string;
  mobile: string;
  country: string;
}

interface StateLocation {
  state: {
    isEdit: boolean;
  };
}

export default function PassengerDetail() {
  const { t } = useTranslation('passenger');
  const location = useLocation();
  const [open, setOpen] = React.useState(false);
  const { state } = location as StateLocation;

  const { control, handleSubmit } = useForm<Values>({
    defaultValues: {
      lastName: '',
      firstName: '',
      email: '',
      mobile: '',
      country: '',
    },
  });
  const handleClose = () => {
    setOpen(false);
  };
  const handleCancel = () => setOpen(true);

  return (
    <LayoutDetail title={t('details')} subTitle={t('passengers')}>
      <Box width="100%" display="flex" justifyContent="center">
        <Box bgcolor="#fff" borderRadius="4px" width={{ xs: '100%', md: '80%' }} padding="24px">
          <Typography color="#0c1132" fontWeight={700}>
            {t(state.isEdit ? 'edit' : 'details')}
          </Typography>
          <Divider sx={{ margin: '16px 0' }} />
          <Grid container spacing={2}>
            <Grid item xs={12} lg={6}>
              <Typography fontSize="14px" fontWeight="bold" marginBottom="16px">
                {t('account_created')} {dayjs(new Date()).format('MM/DD/YYYY')}
              </Typography>
              <FormVerticle fields={fieldDetails} control={control} filterKey={'passenger'} inputProps={{ disabled: !state.isEdit }} />
            </Grid>
            <Grid item xs={12} lg={6}>
              <TableDetailPassenger />
            </Grid>
          </Grid>
          {state.isEdit && <ComboButton onCancel={handleCancel} />}
        </Box>
      </Box>
      <DialogConfirm
        openDialog={open}
        title={t('translation:cancel_type', { type: t('passenger').toLowerCase() })}
        subTitle={t('translation:leave_page')}
        onClose={handleClose}
      />
    </LayoutDetail>
  );
}
