import { Box, Grid, Stack, Typography } from '@mui/material';
import { MapPinIcon } from 'assets';
import Button from 'components/Button/Button';
import MerchandiseDetailView from 'components/MerchandiseDetailView/MerchandiseDetailView';
import OrderDetailView from 'components/OrderDetailView/OrderDetailView';
import PrintIcon from 'components/SvgIcon/PrintIcon';
import SendIcon from 'components/SvgIcon/SendIcon';
import Tag from 'components/Tag/Tag';
import TextWithIcon from 'components/TextWithIcon/TextWithIcon';
import LayoutDetail from 'layout/LayoutDetail';
import React from 'react';
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

export default function OrderConfirm() {
  const { t } = useTranslation(['packageSales', 'translation', 'ticketSales']);

  const renderInfo = (key: string) => {
    switch (key) {
      case 'departures_point':
        return <TextWithIcon text={dataDetails[key]} icon={MapPinIcon} color="#1AA6EE" />;
      case 'payment_status':
        return <Tag text={dataDetails[key]} variant={'success'} />;
      default:
        return <Typography variant="body2">{dataDetails[key]}</Typography>;
    }
  };

  return (
    <LayoutDetail title={t('create_package_orders')} subTitle={t('package_sales')}>
      <Box width="100%" display="flex" justifyContent="center">
        <Box padding="24px" borderRadius={4} bgcolor="white" width={{ xs: '100%', md: '90%' }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={8}>
              <OrderDetailView data={dataDetails} />
            </Grid>
            <Grid item xs={12} md={4}>
              <Box bgcolor="#FAFDFF" borderRadius={4} padding="24px" height="100%">
                <MerchandiseDetailView merchandises={merchandises} />
              </Box>
            </Grid>
          </Grid>
          <Stack direction="row" alignItems="center" justifyContent="flex-end" spacing={2} my="24px">
            <Button
              variant="outlined"
              sx={{
                padding: '12px 16px',
                backgroundColor: '#fff',
                '&:hover': {
                  backgroundColor: '#fff',
                  color: '#1AA6EE',
                },
              }}
              startIcon={<SendIcon fillColor="#1AA6EE" />}>
              {t('ticketSales:email_ticket')}
            </Button>
            <Button variant="contained" backgroundButton="#1AA6EE" sx={{ padding: '12px 16px' }} startIcon={<PrintIcon />}>
              {t('ticketSales:print_ticket')}
            </Button>
          </Stack>
        </Box>
      </Box>
    </LayoutDetail>
  );
}
