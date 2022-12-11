import { Divider, Typography } from '@mui/material';
import { Box } from '@mui/system';
import ComboButton from 'components/ComboButtonSaveCancel/ComboButton';
import DialogConfirm from 'components/DialogConfirm/DialogConfirm';
import HeaderLayout from 'components/HeaderLayout/HeaderLayout';
import Radio from 'components/Radio/Radio';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { v4 as uuid } from 'uuid';

export default function PaymentMethod() {
  const { t } = useTranslation(['account', 'translation']);

  const { control, handleSubmit } = useForm<{ method: string }>({
    defaultValues: {
      method: 'cash',
    },
  });

  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleCancel = () => setOpen(true);

  const methods = [
    { id: uuid(), label: t('cash'), value: 'cash' },
    { id: uuid(), label: t('offline'), value: 'offline' },
    { id: uuid(), label: t('paypal'), value: 'paypal' },
    { id: uuid(), label: t('mobile_money'), value: 'mobile_money' },
  ];

  const onSubmit = (values: any) => {
    console.log({ values });
  };
  return (
    <Box>
      <HeaderLayout activeSideBarHeader={t('payment_methods')} />
      <Box padding="24px">
        <Box display="flex" justifyContent="center" width="100%">
          <Box padding="24px" sx={{ backgroundColor: '#fff' }} borderRadius="4px" width={{ xs: '100%', md: '80%' }}>
            <Typography fontSize={16} fontWeight="700">
              {t('payment_methods')}
            </Typography>
            <Divider sx={{ margin: '16px 0' }} />
            <Box>
              <Typography variant="body2">{t('define_method')}</Typography>
              <Controller
                name="method"
                control={control}
                rules={{
                  required: true,
                }}
                render={({ field }) => {
                  return <Radio {...field} options={methods} radioName="payment-method" />;
                }}
              />
            </Box>
            <ComboButton onSave={handleSubmit(onSubmit)} onCancel={handleCancel} />
          </Box>
        </Box>
      </Box>
      <DialogConfirm
        openDialog={open}
        title={t('translation:cancel_type', { type: t('payment_methods') })}
        subTitle={t('translation:leave_page')}
        onClose={handleClose}
      />
    </Box>
  );
}
