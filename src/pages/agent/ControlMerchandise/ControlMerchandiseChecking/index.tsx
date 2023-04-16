import { Box, Divider, Grid, Typography } from '@mui/material';
import { Empty } from 'antd';
import Button from 'components/Button/Button';
import CardWhite from 'components/CardWhite/CardWhite';
import { LoadingScreen } from 'components/LoadingScreen/LoadingScreen';
import Qrcode from 'components/Qrcode/Qrcode';
import Tag from 'components/Tag/Tag';
import LayoutDetail from 'layout/LayoutDetail';
import { PaymentStatus, PaymentStatusBackgroundColorMapping, PaymentStatusColorMapping } from 'models/PaymentStatus';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useGetPackageSale } from 'services/PackageSales/packageSales';

export default function ControlMerchandiseChecking() {
  const { t } = useTranslation(['dashboard', 'translation']);
  const navigate = useNavigate();

  const { loading, data, run } = useGetPackageSale();

  const dataDetails = useMemo(() => {
    return {
      lastName_sender: data?.sender?.lastName,
      lastName_recipent: data?.recipent.lastName,
      firstName_recipent: data?.recipent.firstName,
      firstName_sender: data?.sender?.firstName,
      number_of_merchandise: data?.totalQuantity,
      payment_status: PaymentStatus.APPROVED,
    };
  }, [data]);

  const renderText = (i: string) => {
    switch (i) {
      case 'payment_status': {
        return (
          <Tag
            text={dataDetails[i]}
            backgroundColor={PaymentStatusBackgroundColorMapping[dataDetails[i]]}
            color={PaymentStatusColorMapping[dataDetails[i]]}
          />
        );
      }
      default:
        return <Typography variant="body2">{dataDetails[i]}</Typography>;
    }
  };

  const handleNext = () => {
    navigate('/agent/control-merchandise-details', { state: data });
  };

  const renderLeft = () => {
    if (loading) {
      return (
        <Box display="flex" alignItems="center" justifyContent="center">
          <LoadingScreen />
        </Box>
      );
    }
    if (!data) {
      return (
        <Box display="flex" alignItems="center" justifyContent="center">
          <Empty />
        </Box>
      );
    }
    return (
      <>
        <Typography variant="h5">{t('merchandise_order')} #6969</Typography>
        <Divider sx={{ margin: '16px 0' }} />
        <Box>
          {Object.keys(dataDetails).map(i => (
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
      </>
    );
  };

  return (
    <LayoutDetail title={t('control_merchandise_deliver')}>
      <CardWhite title={t('order_checking')}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Qrcode code="123" onSearch={value => run(value)} />
          </Grid>
          <Grid item xs={12} md={8}>
            <Box bgcolor="#FAFDFF" borderRadius="4px" padding="24px">
              {renderLeft()}
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
