import { Divider, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { v4 as uuid } from 'uuid';
import ComboButton from 'components/ComboButtonSaveCancel/ComboButton';
import DialogConfirm from 'components/DialogConfirm/DialogConfirm';
import HeaderLayout from 'components/HeaderLayout/HeaderLayout';
import Radio from 'components/Radio/Radio';
import { useGetPaymentMethod } from 'services/Company/paymentMethods';
import { LoadingScreen } from 'components/LoadingScreen/LoadingScreen';
import { FadeIn } from 'components/FadeIn/FadeIn';
import { get } from 'lodash-es';

export default function PaymentMethod() {
  const { t } = useTranslation(['account', 'translation']);

  const { control, handleSubmit } = useForm<{ method: string }>();

  const { loading, data } = useGetPaymentMethod();

  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleCancel = () => setOpen(true);

  const methods = [
    { id: uuid(), label: t('credit_card'), value: 'CREDIT_CARD' },
    { id: uuid(), label: t('paypal'), value: 'PAYPAL' },
  ];

  const onSubmit = (values: any) => {
    console.log({ values, data });
  };

  return (
    <Box>
      <HeaderLayout activeSideBarHeader={t('payment_methods')} />
      {loading ? (
        <LoadingScreen />
      ) : (
        <FadeIn>
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
                    defaultValue={get(data, 'data[0]', '')}
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
        </FadeIn>
      )}
      <DialogConfirm
        openDialog={open}
        title={t('translation:cancel_type', { type: t('payment_methods') })}
        subTitle={t('translation:leave_page')}
        onClose={handleClose}
      />
    </Box>
  );
}
