import { Box, Divider, Grid, Stack, Typography } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Button from 'components/Button/Button';
import MerchandiseDetailView from 'components/MerchandiseDetailView/MerchandiseDetailView';
import OrderDetailView from 'components/OrderDetailView/OrderDetailView';
import CheckCircle from 'components/SvgIcon/CheckCircle';
import LayoutDetail from 'layout/LayoutDetail';
import { useLocation, useNavigate } from 'react-router-dom';
import { PackageSale } from 'models/PackageSales';
import dayjs from 'dayjs';
import { getAppCurrencySymbol } from 'utils/getAppCurrencySymbol';
import { PaymentStatus } from 'models/PaymentStatus';

export default function ControlMerchandiseDetail() {
  const { t } = useTranslation(['dashboard']);
  const [status, setStatus] = useState('arrived');

  const location = useLocation();
  const navigate = useNavigate();

  const locationState = useMemo(() => {
    return location.state as PackageSale | null | undefined;
  }, [location.state]);

  const dataDetails = useMemo(() => {
    return {
      order_id: locationState?.orderCode,
      departure_point: locationState?.departurePoint,
      // FIXME: Format date time
      date: dayjs(locationState?.createdAt).format('MM/DD/YYYY - HH:mm'),
      sender_name: locationState?.sender?.firstName + ' ' + locationState?.sender?.lastName,
      sender_mobile: locationState?.sender?.mobile,
      recipent_name: locationState?.recipent?.firstName + ' ' + locationState?.recipent?.lastName,
      recipent_mobile: locationState?.recipent?.mobile,
      // FIXME: totalQuantity?
      quantity: locationState?.merchandises?.length,
      // FIXME: Weight symbol
      weight:
        locationState?.merchandises?.reduce((accumulator, item) => {
          return accumulator + (item?.weight ?? 0);
        }, 0) + 'kg',
      // FIXME: totalPrice?
      price:
        getAppCurrencySymbol() +
        locationState?.merchandises?.reduce((accumulator, item) => {
          return accumulator + (item?.price ?? 0);
        }, 0),
      // FIXME: Đợi anh Linh update type
      payment_status: PaymentStatus.APPROVED,
    };
  }, [locationState]);

  const merchandises = useMemo(() => {
    return locationState?.merchandises?.map(merchandise => {
      return {
        title: merchandise.package?.title,
        // FIXME: Weight symbol
        weight: merchandise.weight + 'kg',
        price: getAppCurrencySymbol() + merchandise.price,
        id: merchandise.package?._id,
      };
    });
  }, [locationState]);

  const handleChangeStatus = (val: string) => () => {
    setStatus(val);
  };

  useEffect(() => {
    if (!locationState) {
      navigate('/agent/control-merchandise-delivery');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locationState]);

  return (
    <LayoutDetail title={t('dashboard.control_merchandise_deliver')}>
      <Box width={{ xs: '100%', md: '90%' }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Box bgcolor="#fff" borderRadius="4px" padding="24px">
              <OrderDetailView data={dataDetails} />
            </Box>
          </Grid>
          <Grid item xs={12} md={3}>
            <Stack direction="column" spacing="24px">
              {/* FIXME: Thiếu API */}
              <Box bgcolor="#fff" borderRadius="4px" padding="24px">
                <Typography variant="h5">{t('delivery_status')}</Typography>
                <Divider sx={{ margin: '16px 0' }} />
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Typography variant="body2">{t('arrived_destination')}</Typography>
                  <Button onClick={handleChangeStatus('arrived')}>
                    <CheckCircle success={status === 'arrived'} />
                  </Button>
                </Stack>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Typography variant="body2">{t('delivered_recipient')}</Typography>
                  <Button onClick={handleChangeStatus('delivered')}>
                    <CheckCircle success={status === 'delivered'} />
                  </Button>
                </Stack>
              </Box>
              <Box bgcolor="#fff" borderRadius="4px" padding="24px">
                <MerchandiseDetailView merchandises={merchandises} />
              </Box>
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </LayoutDetail>
  );
}
