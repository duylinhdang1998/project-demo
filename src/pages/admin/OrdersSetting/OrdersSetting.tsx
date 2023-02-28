import { Box, Stack, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import CardWhite from 'components/CardWhite/CardWhite';
import ComboButton from 'components/ComboButtonSaveCancel/ComboButton';
import DialogConfirm from 'components/DialogConfirm/DialogConfirm';
import HeaderLayout from 'components/HeaderLayout/HeaderLayout';
import { useGetOrderSettings, useUpdateOrderSettings } from 'services/Company/orderSettings';
import { LoadingScreen } from 'components/LoadingScreen/LoadingScreen';
import { get } from 'lodash';
import { FadeIn } from 'components/FadeIn/FadeIn';
import { Controller, useForm } from 'react-hook-form';
import { getNotifcation } from 'utils/getNotification';

const useStyles = makeStyles(() => ({
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

interface Values {
  pendingPayment: string;
  startTrip: string;
}

export default function OrdersSetting() {
  const classes = useStyles();
  const { control, handleSubmit } = useForm<Values>();
  const { t } = useTranslation(['account', 'translation']);
  const [open, setOpen] = useState(false);

  const { loading, data } = useGetOrderSettings();
  const { loading: updateLoading, run: updateOrderSettings } = useUpdateOrderSettings({
    onSuccess: data => {
      getNotifcation({ code: data.code, success: t('update_success'), error: t('update_error') });
    },
  });

  const handleClose = () => {
    setOpen(false);
  };
  const handleCancel = () => setOpen(true);

  const onSave = (values: Values) => {
    updateOrderSettings({
      pendingPayment: Number(values.pendingPayment),
      startTrip: Number(values.startTrip),
    });
  };

  return (
    <Box>
      <HeaderLayout activeSideBarHeader={t('orders_setting')} />
      {loading ? (
        <LoadingScreen />
      ) : (
        <FadeIn>
          <Box padding="24px">
            <CardWhite title={t('orders_setting')}>
              <Typography variant="body2">{t('an_order_status')}</Typography>
              <Stack direction="row" spacing={2} my="10px" alignItems="center">
                <Box className={classes.inputNumberWrap}>
                  <Controller
                    control={control}
                    name="pendingPayment"
                    defaultValue={get(data, 'data.pendingPayment', 0).toString()}
                    render={({ field }) => <input {...field} min={0} type="number" className={classes.inputNumber} />}
                  />
                </Box>
                <Typography variant="body2">{t('minutes_before_start_trip')}</Typography>
              </Stack>
              <Typography variant="body2">{t('time_start_trip')}</Typography>
              <Stack direction="row" spacing={2} my="10px" alignItems="center">
                <Box className={classes.inputNumberWrap}>
                  <Controller
                    control={control}
                    name="startTrip"
                    defaultValue={get(data, 'data.startTrip', 0).toString()}
                    render={({ field }) => <input {...field} min={0} type="number" className={classes.inputNumber} />}
                  />
                </Box>
                <Typography variant="body2">{t('minutes_before_start_trip')}</Typography>
              </Stack>
              <ComboButton onCancel={handleCancel} onSave={handleSubmit(onSave)} isSaving={updateLoading} />
            </CardWhite>
          </Box>
        </FadeIn>
      )}
      <DialogConfirm
        openDialog={open}
        title={t('translation:cancel_type', { type: t('orders_setting') })}
        subTitle={t('translation:leave_page')}
        onClose={handleClose}
      />
    </Box>
  );
}
