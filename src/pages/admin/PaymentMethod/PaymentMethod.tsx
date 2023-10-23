/* eslint-disable react-hooks/exhaustive-deps */
import { Divider, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useEffect, useMemo, useState } from 'react';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import ComboButton from 'components/ComboButtonSaveCancel/ComboButton';
import DialogConfirm from 'components/DialogConfirm/DialogConfirm';
import HeaderLayout from 'components/HeaderLayout/HeaderLayout';
import { useGetPaymentMethod, useRegisterPaypal, useUpdatePaymentSettings } from 'services/Company/paymentMethods';
import { LoadingScreen } from 'components/LoadingScreen/LoadingScreen';
import { FadeIn } from 'components/FadeIn/FadeIn';
import { includes, isEmpty } from 'lodash-es';
import { getNotifcation } from 'utils/getNotification';
import { CheckboxGroup } from 'components/CheckboxGroup/CheckboxGroup';
import { isEqual } from 'lodash-es';
import { useNavigate, useSearchParams } from 'react-router-dom';

export default function PaymentMethod() {
  const { t } = useTranslation(['account', 'translation']);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const code = searchParams.get('code');

  const formInstance = useForm<{ methods: string[] }>();
  const { control, handleSubmit, reset } = formInstance;

  const { loading, data } = useGetPaymentMethod();
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
        status: includes(values.methods, item.value),
      })) ?? [];

    updateMethod({
      data: payloadMethod,
    });
  };

  return (
    <Box>
      <HeaderLayout activeSideBarHeader={t('payment_methods')} />
      {loading ? (
        <LoadingScreen />
      ) : (
        <FadeIn>
          <FormProvider {...formInstance}>
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
                      // defaultValue={methodValueWatch ?? []}
                      render={({ field }) => {
                        return (
                          <CheckboxGroup
                            horizontal={false}
                            options={methods ?? []}
                            values={field.value ?? []}
                            onChange={field.onChange}
                            equalsFunc={isEqual}
                            dataMethod={data}
                            onSubmit={onSubmit}
                          />
                        );
                      }}
                    />
                  </Box>
                  <ComboButton onSave={handleSubmit(onSubmit)} onCancel={handleCancel} isSaving={updateLoading} />
                </Box>
              </Box>
            </Box>
          </FormProvider>
        </FadeIn>
      )}
      <DialogConfirm
        openDialog={open}
        title={t('translation:cancel_type', { type: t('payment_methods') })}
        subTitle={t('translation:leave_page')}
        onClose={handleClose}
        onOk={() => navigate('/')}
      />
    </Box>
  );
}
