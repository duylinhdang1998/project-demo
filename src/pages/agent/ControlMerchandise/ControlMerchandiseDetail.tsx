import { Box, Divider, Grid, Stack, Typography } from '@mui/material';
import Button from 'components/Button/Button';
import MerchandiseDetailView from 'components/MerchandiseDetailView/MerchandiseDetailView';
import OrderDetailView from 'components/OrderDetailView/OrderDetailView';
import CheckCircle from 'components/SvgIcon/CheckCircle';
import LayoutDetail from 'layout/LayoutDetail';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { v4 as uuid } from 'uuid';

const dataDetails = {
  order_id: '023232-0023',
  departures_point: 'Lyon Gare Perrache',
  date: '02/27/2022 - 10H30',
  sender_name: 'Payoun Samia',
  sender_mobile: '0123456789',
  recipent_name: 'Payoun Samia',
  recipent_mobile: '0123456789',
  quantity: 2,
  weight: '4kg',
  price: '$10',
  payment_status: 'Paid',
};

const merchandises = [
  { title: 'Package 2kg', weight: '2kg', price: '$2', id: uuid() },
  { title: 'Package 2kg', weight: '2kg', price: '$2', id: uuid() },
];

export default function ControlMerchandiseDetail() {
  const { t } = useTranslation(['dashboard']);
  const [status, setStatus] = useState('arrived');

  const handleChangeStatus = (val: string) => () => {
    setStatus(val);
  };

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
