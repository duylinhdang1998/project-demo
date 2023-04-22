import React, { useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import LayoutDetail from 'layout/LayoutDetail';
import { Box, Divider, Grid, Typography } from '@mui/material';
import FormVerticle from 'components/FormVerticle/FormVerticle';
import { fields4 } from './constant';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { orderConfirmSelector } from 'store/passengers/selectors';
import { isEmpty } from 'lodash-es';
import ReserveBooking from './components/ReserveBooking';
import { omit } from 'ramda';
import { useCreatePackageSale } from 'services/PackageSales/packageSales';
import { getNotifcation } from 'utils/getNotification';
import { useNavigate } from 'react-router-dom';

interface Values {
  firtName: string;
  lastName: string;
  email: string;
}
const fieldKeys = ['firstName', 'lastName', 'email'];

export default function OrderConfirm() {
  const { t } = useTranslation(['packageSales', 'translation', 'ticketSales']);
  const orderConfirmData = useSelector(orderConfirmSelector);
  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<Values>({
    defaultValues: {},
  });
  const navigate = useNavigate();

  const { run: createPackageSale, loading } = useCreatePackageSale({
    onSuccess: dataCode => {
      getNotifcation({
        code: dataCode.code,
        success: t('success'),
        error: t('error'),
        onSuccess: () => {
          reset();
          navigate('order-detail-confirm', {
            state: {
              data: dataCode,
            },
          });
        },
      });
    },
  });

  useEffect(() => {
    if (isEmpty(orderConfirmData)) {
      throw 'Some thing went wrong';
    }
  }, [orderConfirmData]);

  const messages = useMemo(() => {
    return fieldKeys.reduce<Record<string, string>>((res, key) => {
      return {
        ...res,
        [key]: t('translation:error_required', { name: t(`translation:${key}`).toLowerCase() }),
      };
    }, {});
  }, [t]);

  const onCreate = (values: Values) => {
    const payload = {
      email: values.email,
      ...omit(['merchandise'], orderConfirmData),
      merchandises: orderConfirmData.merchandise?.map(i => ({
        package: i.title.value,
        weight: parseInt(i.weight),
        price: parseInt(i.price),
      })),
      returnUrl: 'aaa',
      cancelUrl: 'bbb',
      paymentMethod: 'PAYPAL',
    };
    createPackageSale(payload);
  };

  return (
    <LayoutDetail title={t('create_package_orders')} subTitle={t('package_sales')}>
      <Grid container spacing="24px">
        <Grid item xs={12} md={8}>
          <Box bgcolor="#fff" borderRadius="4px" width="100%" padding="24px">
            <Typography color="#0c1132" fontWeight={700}>
              {t('order_infomation')}
            </Typography>
            <Divider sx={{ margin: '16px 0' }} />
            <FormVerticle
              fields={fields4}
              grid
              isGridHorizon
              indexGridHorizon={2}
              filterKey="translation"
              control={control}
              errors={errors}
              messages={messages}
            />
            <Divider sx={{ margin: '16px 0' }} />
            {orderConfirmData?.merchandise?.map((i, index) => (
              <Box key={(i.weight + index).toString()}>
                <Typography fontSize={14} fontWeight={600} paddingY="10px">
                  {t('translation:merchandise')} {index + 1}
                </Typography>
                <Grid container spacing="10px">
                  <Grid item xs={12} lg={4}>
                    <Typography fontSize={14} marginBottom="5px">
                      {t('title')}
                    </Typography>
                    <Typography fontSize={14} padding="10px 14px" border="1px solid #F7F7F7">
                      {i.title.label}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} lg={4}>
                    <Typography fontSize={14} marginBottom="5px">
                      {t('weight')}
                    </Typography>
                    <Typography fontSize={14} padding="10px 14px" border="1px solid #F7F7F7">
                      {i.weight}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} lg={4}>
                    <Typography fontSize={14} marginBottom="5px">
                      {t('price')}
                    </Typography>
                    <Typography fontSize={14} padding="10px 14px" border="1px solid #F7F7F7">
                      {i.price}
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
            ))}
          </Box>
        </Grid>
        <Grid item xs={12} md={4}>
          <ReserveBooking onBook={handleSubmit(onCreate)} loading={loading} />
        </Grid>
      </Grid>
    </LayoutDetail>
  );
}
