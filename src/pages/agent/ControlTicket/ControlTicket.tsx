import { Box, Divider, Grid, Typography } from '@mui/material';
import { MapPinIcon } from 'assets';
import CardWhite from 'components/CardWhite/CardWhite';
import Qrcode from 'components/Qrcode/Qrcode';
import Tag from 'components/Tag/Tag';
import TextWithIcon from 'components/TextWithIcon/TextWithIcon';
import LayoutDetail from 'layout/LayoutDetail';
import React from 'react';
import { useTranslation } from 'react-i18next';

const dataDetails = {
  lastName: 'Payoun',
  firstName: 'Samia',
  route: ['Lyon Gare Perrache', 'Lyon Gare Perrache'],
  date_time: '02/27/2022 - 10H30',
  number_of_passengers: 4,
  payment_status: 'Paid',
};

export default function ControlTicket() {
  const { t } = useTranslation(['dashboard', 'ticketSales']);

  const renderText = (i: string) => {
    switch (i) {
      case 'route':
        return dataDetails[i].map((o, index) => (
          <Box my="2px">
            <TextWithIcon key={index.toString()} text={o} icon={MapPinIcon} color="#1AA6EE" />
          </Box>
        ));
      case 'payment_status':
        return <Tag text={dataDetails[i]} variant={'success'} />;
      default:
        return <Typography variant="body2">{dataDetails[i]}</Typography>;
    }
  };

  return (
    <LayoutDetail title={t('control_ticket')}>
      <CardWhite title={t('order_checking')}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={3}>
            <Qrcode code="123" />
          </Grid>
          <Grid item xs={12} md={8}>
            <Box bgcolor="#FAFDFF" borderRadius="4px" padding="24px">
              <Typography variant="h5">{t('ticketSales:ticket')} #6969</Typography>
              <Divider sx={{ margin: '16px 0' }} />
              <Box>
                {Object.keys(dataDetails).map((i) => (
                  <Grid container spacing={2} key={i} my="2px">
                    <Grid item xs={3}>
                      <Typography variant="body2">{t(`ticketSales:${i}`)}:</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      {renderText(i)}
                    </Grid>
                  </Grid>
                ))}
              </Box>
            </Box>
          </Grid>
        </Grid>
      </CardWhite>
    </LayoutDetail>
  );
}
