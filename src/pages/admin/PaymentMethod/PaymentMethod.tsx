/* eslint-disable react-hooks/exhaustive-deps */
import { Divider, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useEffect, useState } from 'react';
import { Controller, useForm, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { v4 as uuid } from 'uuid';
import ComboButton from 'components/ComboButtonSaveCancel/ComboButton';
import DialogConfirm from 'components/DialogConfirm/DialogConfirm';
import HeaderLayout from 'components/HeaderLayout/HeaderLayout';
import Radio from 'components/Radio/Radio';
import { useGetPaymentMethod, useLoginPaymentGateway, useUpdatePaymentSettings } from 'services/Company/paymentMethods';
import { LoadingScreen } from 'components/LoadingScreen/LoadingScreen';
import { FadeIn } from 'components/FadeIn/FadeIn';
import { get } from 'lodash-es';
import { styled } from '@mui/material/styles';
import { getNotifcation } from 'utils/getNotification';
import Button from 'components/Button/Button';

const PaypalButton = styled(Button)({
  backgroundColor: '#263B80',
  '&:hover': {
    backgroundColor: '#263B80',
    boxShadow: 'none',
  },
  marginTop: '16px',
});

export default function PaymentMethod() {
  const { t } = useTranslation(['account', 'translation']);

  const { control, handleSubmit, reset } = useForm<{ method: string }>();

  const { loading, data } = useGetPaymentMethod();
  const { loading: loading2, runAsync: getUrlGateWay } = useLoginPaymentGateway();
  const { loading: updateLoading, run: updateMethod } = useUpdatePaymentSettings({
    onSuccess: data => {
      getNotifcation({
        code: data.code,
        error: t('edit_type_error', { type: t('payment_methods') }),
        success: t('edit_type_success', { type: t('payment_methods') }),
      });
    },
  });

  const methodValueWatch = useWatch({
    control,
    name: 'method',
  });

  useEffect(() => {
    if (data?.code === 0) {
      reset({
        method: get(data, 'data[0]', ''),
      });
    }
  }, [data]);

  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleCancel = () => setOpen(true);

  const methods = [
    { id: uuid(), label: t('stripe'), value: 'STRIPE' },
    { id: uuid(), label: t('paypal'), value: 'PAYPAL' },
  ];

  const onSubmit = (values: any) => {
    updateMethod({
      method: [values.method],
    });
  };

  const handleLogin = async () => {
    if (methodValueWatch === 'PAYPAL') {
      return;
    }
    const response = await getUrlGateWay('/v1.0/company/payment/stripe-links', {
      refreshUrl: window.location.href,
      returnUrl: window.location.href,
    });
    window.open(get(response, 'url', ''), '_blank');
  };

  const renderButton = () => {
    return (
      <Box>
        <Typography variant="body2" fontWeight={600}>
          {t('click_button_description_paypal')}
        </Typography>
        <Typography variant="body2">{t('subtext_2')}</Typography>

        <PaypalButton
          sx={{
            backgroundColor: '#263B80',
          }}
          variant="contained"
          loading={loading2}
          onClick={handleLogin}
        >
          {methodValueWatch === 'PAYPAL' ? t('login_paypal') : t('login_stripe')}
        </PaypalButton>
      </Box>
    );
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
                    rules={{
                      required: true,
                    }}
                    render={({ field }) => {
                      return <Radio {...field} options={methods} radioName="payment-method" />;
                    }}
                  />
                  {renderButton()}
                </Box>
                <ComboButton onSave={handleSubmit(onSubmit)} onCancel={handleCancel} isSaving={updateLoading} />
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
