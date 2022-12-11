import { Box, Stack, Theme, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import CardWhite from 'components/CardWhite/CardWhite';
import ComboButton from 'components/ComboButtonSaveCancel/ComboButton';
import DialogConfirm from 'components/DialogConfirm/DialogConfirm';
import HeaderLayout from 'components/HeaderLayout/HeaderLayout';
import React from 'react';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles((theme: Theme) => ({
  inputNumberWrap: {
    border: '1px solid #F7F7F7',
    backgroundColor: '#fff',
    borderRadius: '4px',
    height: '40px',
    display: 'inline-flex',
    alignItems: 'center',
    padding: '0 10px',
  },
  inputNumber: {
    width: '100%',
    height: '35px',
    borderColor: 'transparent',
    '&:focus-visible': {
      outline: 'none',
    },
  },
}));

export default function OrdersSetting() {
  const classes = useStyles();
  const { t } = useTranslation(['account', 'translation']);
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleCancel = () => setOpen(true);

  return (
    <Box>
      <HeaderLayout activeSideBarHeader={t('orders_setting')} />
      <Box padding="24px">
        <CardWhite title={t('orders_setting')}>
          <Typography variant="body2">{t('an_order_status')}</Typography>
          <Stack direction="row" spacing={2} my="10px" alignItems="center">
            <Box className={classes.inputNumberWrap}>
              <input min={0} defaultValue={1} type="number" className={classes.inputNumber} />
            </Box>
            <Typography variant="body2">{t('minutes_before_start_trip')}</Typography>
          </Stack>
          <Typography variant="body2">{t('time_start_trip')}</Typography>
          <Stack direction="row" spacing={2} my="10px" alignItems="center">
            <Box className={classes.inputNumberWrap}>
              <input min={0} defaultValue={1} type="number" className={classes.inputNumber} />
            </Box>
            <Typography variant="body2">{t('minutes_before_start_trip')}</Typography>
          </Stack>
          <ComboButton onCancel={handleCancel} />
        </CardWhite>
      </Box>
      <DialogConfirm openDialog={open} title={t('translation:cancel_type', { type: t('orders_setting') })} subTitle={t('translation:leave_page')} onClose={handleClose} />
    </Box>
  );
}
