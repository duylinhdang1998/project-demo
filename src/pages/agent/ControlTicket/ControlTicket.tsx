import { Box, Divider, Grid, Typography } from '@mui/material';
import { Empty } from 'antd';
import CardWhite from 'components/CardWhite/CardWhite';
import { LoadingScreen } from 'components/LoadingScreen/LoadingScreen';
import Qrcode from 'components/Qrcode/Qrcode';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { useAppSelector } from 'hooks/useAppSelector';
import LayoutDetail from 'layout/LayoutDetail';
import { get } from 'lodash-es';
import { useTranslation } from 'react-i18next';
import { selectTicketSales } from 'store/ticketSales/selectors';
import { ticketSalesActions } from 'store/ticketSales/ticketSalesSlice';
import { Infomation } from './Infomation';
import { MapPinIcon } from 'assets';
import TextWithIcon from 'components/TextWithIcon/TextWithIcon';
import dayjs from 'dayjs';
import { useMemo } from 'react';
import { getPaymentStatusTag } from 'pages/admin/TicketSales/utils/getPaymentStatusTag';
import Tag from 'components/Tag/Tag';

export default function ControlTicket() {
  const { t } = useTranslation(['dashboard', 'ticketSales']);

  const { statusGetTicketSale, ticketSale } = useAppSelector(selectTicketSales);
  const dispatch = useAppDispatch();

  const { backgroundColor, color } = useMemo(() => {
    if (ticketSale?.paymentStatus) {
      return getPaymentStatusTag(ticketSale?.paymentStatus);
    }
    return {
      backgroundColor: 'transparent',
      color: 'transparent',
    };
  }, [ticketSale?.paymentStatus]);

  const renderLeft = () => {
    if (statusGetTicketSale === 'loading') {
      return (
        <Box display="flex" alignItems="center" justifyContent="center">
          <LoadingScreen />
        </Box>
      );
    }

    if (!ticketSale) {
      return (
        <Box display="flex" alignItems="center" justifyContent="center">
          <Empty />
        </Box>
      );
    }

    return (
      <>
        <Typography variant="h5">
          {t('ticketSales:ticket')} {ticketSale?.orderCode}
        </Typography>
        <Divider sx={{ margin: '16px 0' }} />
        <Box>
          <Infomation left={t('ticketSales:lastName')} right={get(ticketSale?.passengers, 0)?.lastName} />
          <Infomation left={t('ticketSales:firstName')} right={get(ticketSale?.passengers, 0)?.firstName} />
          <Infomation
            left={t('ticketSales:route')}
            right={
              <>
                <Box my="2px">
                  <TextWithIcon text={ticketSale?.departurePoint} icon={MapPinIcon} color="#1AA6EE" />
                </Box>
                <Box my="2px">
                  <TextWithIcon text={ticketSale?.arrivalPoint} icon={MapPinIcon} color="#1AA6EE" />
                </Box>
              </>
            }
          />
          <Infomation left={t('ticketSales:date_time')} right={dayjs(ticketSale?.createdAt).format('MM/DD/YYYY - HH:mm')} />
          <Infomation left={t('ticketSales:number_of_passengers')} right={ticketSale?.passengers.length} />
          <Infomation
            left={t('ticketSales:payment_status')}
            right={<Tag color={color} backgroundColor={backgroundColor} text={ticketSale?.paymentStatus} />}
          />
        </Box>
      </>
    );
  };

  return (
    <LayoutDetail title={t('control_ticket')}>
      <CardWhite title={t('order_checking')}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Qrcode code="123" onSearch={value => dispatch(ticketSalesActions.getTicketSaleRequest({ orderCode: value }))} />
          </Grid>
          <Grid item xs={12} md={8}>
            <Box bgcolor="#FAFDFF" borderRadius="4px" padding="24px">
              {renderLeft()}
            </Box>
          </Grid>
        </Grid>
      </CardWhite>
    </LayoutDetail>
  );
}
