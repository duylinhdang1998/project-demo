import { Box, Divider, Grid, Stack, Typography } from '@mui/material';
import Empty from 'assets/images/empty-result.svg';
import Button from 'components/Button/Button';
import CardWhite from 'components/CardWhite/CardWhite';
import { LoadingScreen } from 'components/LoadingScreen/LoadingScreen';
import { MerchandiseStatus } from 'components/MerchandiseStatus/MerchandiseStatus';
import Qrcode from 'components/Qrcode/Qrcode';
import Tag from 'components/Tag/Tag';
import ToastCustom from 'components/ToastCustom/ToastCustom';
import LayoutDetail from 'layout/LayoutDetail';
import { get } from 'lodash-es';
import { PaymentStatusBackgroundColorMapping, PaymentStatusColorMapping, PaymentStatusLabelMapping } from 'models/PaymentStatus';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useGetPackageSale } from 'services/PackageSales/packageSales';
import { getOrderCodeFromScanQr } from 'utils/getOrderCodeFromScanQr';

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
      number_of_merchandise: data?.merchandises.length,
      payment_status: data?.paymentStatus,
    };
  }, [data]);

  const renderText = (i: string) => {
    switch (i) {
      case 'payment_status': {
        return (
          <Tag
            text={get(PaymentStatusLabelMapping, `${dataDetails[i]}`, '')}
            backgroundColor={get(PaymentStatusBackgroundColorMapping, `${dataDetails[i]}`, '')}
            color={get(PaymentStatusColorMapping, `${dataDetails[i]}`, '')}
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

  const renderRight = () => {
    if (loading) {
      return (
        <Box sx={{ position: 'relative' }} display="flex" alignItems="center" justifyContent="center">
          <LoadingScreen />
        </Box>
      );
    }
    if (!data) {
      return (
        <Box display="flex" alignItems="center" justifyContent="center">
          <img src={Empty} alt="Empty" />
        </Box>
      );
    }
    return (
      <>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography variant="h5">
            {t('merchandise_order')} #{data.orderCode}
          </Typography>
          <MerchandiseStatus status={data.deliveryStatus} />
        </Stack>
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
            <Qrcode
              code="123"
              onScanQR={result => {
                run({
                  orderCode: getOrderCodeFromScanQr(result.data),
                  onError() {
                    toast(<ToastCustom type="error" text={t('translation:invalid_qrcode')} />, { className: 'toast-error' });
                  },
                });
              }}
              onSearch={value => run({ orderCode: value })}
            />
          </Grid>
          <Grid item xs={12} md={8}>
            <Box bgcolor="#FAFDFF" borderRadius="4px" padding="24px">
              {renderRight()}
            </Box>
          </Grid>
        </Grid>
        <Button backgroundButton="#1AA6EE" sx={{ float: 'right', padding: '10px 30px !important' }} onClick={handleNext}>
          {t('translation:show_detail')}
        </Button>
      </CardWhite>
    </LayoutDetail>
  );
}
