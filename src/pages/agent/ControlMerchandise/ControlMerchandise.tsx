import { Box, Divider, Grid, Typography } from '@mui/material';
import Button from 'components/Button/Button';
import CardWhite from 'components/CardWhite/CardWhite';
import Qrcode from 'components/Qrcode/Qrcode';
import Tag from 'components/Tag/Tag';
import LayoutDetail from 'layout/LayoutDetail';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

const dataDetails = {
  lastName_sender: 'Payoun',
  lastName_recipent: 'Inochi',
  firstName_recipent: 'Samia',
  firstName_sender: 'Hitokiri',
  number_of_merchandise: 4,
  payment_status: 'Paid',
};

export default function ControlMerchandise() {
  const { t } = useTranslation(['dashboard', 'translation']);
  const navigate = useNavigate();

  const renderText = (i: string) => {
    switch (i) {
      case 'payment_status':
        return <Tag text={dataDetails[i]} variant={'success'} />;
      default:
        return <Typography variant="body2">{dataDetails[i]}</Typography>;
    }
  };

  const handleNext = () => {
    navigate('/agent/control-merchandise-details');
  };

  return (
    <LayoutDetail title={t('control_merchandise_deliver')}>
      <CardWhite title={t('order_checking')}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Qrcode code="123" />
          </Grid>
          <Grid item xs={12} md={8}>
            <Box bgcolor="#FAFDFF" borderRadius="4px" padding="24px">
              <Typography variant="h5">{t('merchandise_order')} #6969</Typography>
              <Divider sx={{ margin: '16px 0' }} />
              <Box>
                {Object.keys(dataDetails).map((i) => (
                  <Grid container spacing={2} key={i} my="2px">
                    <Grid item xs={3}>
                      <Typography variant="body2">{t(`${i}`)}:</Typography>
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
        <Button backgroundButton="#1AA6EE" sx={{ float: 'right', padding: '10px 30px !important' }} onClick={handleNext}>
          {t('translation:next')}
        </Button>
      </CardWhite>
    </LayoutDetail>
  );
}
