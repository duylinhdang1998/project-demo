/* eslint-disable react-hooks/exhaustive-deps */
import { Divider, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useEffect, useMemo, useState } from 'react';
import { Controller, useForm, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import ComboButton from 'components/ComboButtonSaveCancel/ComboButton';
import DialogConfirm from 'components/DialogConfirm/DialogConfirm';
import HeaderLayout from 'components/HeaderLayout/HeaderLayout';
import { useGetPaymentMethod, useLoginPaymentGateway, useRegisterPaypal, useUpdatePaymentSettings } from 'services/Company/paymentMethods';
import { LoadingScreen } from 'components/LoadingScreen/LoadingScreen';
import { FadeIn } from 'components/FadeIn/FadeIn';
import { get, includes, isEmpty } from 'lodash-es';
import { styled } from '@mui/material/styles';
import { getNotifcation } from 'utils/getNotification';
import Button from 'components/Button/Button';
import { CheckboxGroup } from 'components/CheckboxGroup/CheckboxGroup';
import { isEqual } from 'lodash-es';
import { CheckCircleOutlined } from '@mui/icons-material';
import { useSearchParams } from 'react-router-dom';

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
  const [searchParams] = useSearchParams();

  const code = searchParams.get('code');

  const { control, handleSubmit, reset } = useForm<{ methods: string[] }>();

  const { loading, data } = useGetPaymentMethod();
  const { loading: loading2, runAsync: getUrlGateWay } = useLoginPaymentGateway();
  const { loading: updateLoading, run: updateMethod } = useUpdatePaymentSettings({
    onSuccess: data => {
      getNotifcation({
        code: data.code,
        error: t('translation:edit_type_error', { type: t('payment_methods') }),
        success: t('translation:edit_type_success', { type: t('payment_methods') }),
      });
    },
  });

  const { run: registerPaypal } = useRegisterPaypal();

  const methodValueWatch = useWatch({
    control,
    name: 'methods',
  });

  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleCancel = () => setOpen(true);

  useEffect(() => {
    if (!isEmpty(data?.data)) {
      reset({
        methods: data?.data?.filter(item => !!item.status).map(i => i.paymentGateWay),
      });
    }
  }, [data?.data]);

  useEffect(() => {
    if (!!code) {
      registerPaypal(code);
    }
  }, [code]);

  const methods = useMemo(() => {
    if (!isEmpty(data?.data)) {
      return data?.data.map(item => ({
        key: item._id,
        value: item.paymentGateWay,
        status: item.status,
        registered: item.registered,
        label: item.paymentGateWay,
      }));
    }
    return [];
  }, [data?.data]);

  const onSubmit = (values: any) => {
    const payloadMethod =
      methods?.map(item => ({
        method: item.value,
        status: includes(values.methods, item.value) ? true : false,
      })) ?? [];

    updateMethod({
      data: payloadMethod,
    });
  };

  const handleLogin = (gate: string) => async () => {
    if (gate === 'PAYPAL') {
      const response = await getUrlGateWay('v1.0/company/payment/paypal/connect');
      if (response) {
        window.open(response, '_self');
      }
      return;
    }
    const response = await getUrlGateWay('/v1.0/company/payment/stripe-links', {
      refreshUrl: window.location.href,
      returnUrl: window.location.href,
    });
    window.open(get(response, 'url', ''), '_blank');
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
                    control={control}
                    name={`methods`}
                    defaultValue={methodValueWatch ?? []}
                    render={({ field }) => {
                      return (
                        <CheckboxGroup
                          horizontal={false}
                          options={methods ?? []}
                          values={field.value ?? []}
                          onChange={field.onChange}
                          equalsFunc={isEqual}
                        />
                      );
                    }}
                  />
                  {data?.data?.map(item => (
                    <Box key={item._id} mb="10px">
                      {includes(methodValueWatch, item.paymentGateWay) && (
                        <>
                          <Typography variant="body2" fontWeight={600}>
                            {t('click_button_description_paypal', { method: item.paymentGateWay?.toLowerCase() })}
                          </Typography>
                          <Typography variant="body2">{t('subtext_2', { method: item.paymentGateWay?.toLowerCase() })}</Typography>

                          <PaypalButton
                            sx={{
                              backgroundColor: item.paymentGateWay === 'PAYPAL' ? '#263B80' : '#635BFF',
                            }}
                            variant="contained"
                            loading={loading2}
                            onClick={handleLogin(item.paymentGateWay ?? '')}
                            startIcon={item.registered ? <CheckCircleOutlined /> : null}
                          >
                            {item.paymentGateWay === 'PAYPAL' ? t('login_paypal') : t('login_stripe')}
                          </PaypalButton>
                          {!item.registered && (
                            <Typography color="#B58205" mt="4px" fontSize={12}>
                              {t('not_registered_payment')}
                            </Typography>
                          )}
                        </>
                      )}
                    </Box>
                  ))}
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
