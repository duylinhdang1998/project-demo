import { Grid, Stack, Typography, useTheme } from '@mui/material';
import { Box } from '@mui/system';
import { MapPinIcon } from 'assets';
import Button from 'components/Button/Button';
import { EmptyScreen } from 'components/EmptyScreen/EmptyScreen';
import { LoadingScreen } from 'components/LoadingScreen/LoadingScreen';
import { ArrowOutward } from 'components/SvgIcon/ArrowOutward';
import PrintIcon from 'components/SvgIcon/PrintIcon';
import SendIcon from 'components/SvgIcon/SendIcon';
import ListIcon from '@mui/icons-material/List';
import Tag from 'components/Tag/Tag';
import TextWithIcon from 'components/TextWithIcon/TextWithIcon';
import ToastCustom from 'components/ToastCustom/ToastCustom';
import dayjs from 'dayjs';
import { useAppSelector } from 'hooks/useAppSelector';
import LayoutDetail from 'layout/LayoutDetail';
import { PaymentStatusBackgroundColorMapping, PaymentStatusColorMapping, PaymentStatusLabelMapping } from 'models/PaymentStatus';
import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { TicketDirection } from 'services/models/TicketSale';
import { selectTicketSales } from 'store/ticketSales/selectors';
import { ticketSalesActions } from 'store/ticketSales/ticketSalesSlice';
import { ModalPrintTicket } from '../../../../components/ModalPrintTicket/ModalPrintTicket';
import { ColumnTicket } from '../components/ColumnTicket';
import { getQrCodeData } from '../utils/getQrCodeData';
import { ticketSaleModelToColumnTicket } from '../utils/ticketSaleModelToColumnTicket';
import OrderDetails from './components/OrderDetail';
import { Infomation } from './components/OrderDetail/Infomation';
import { PassengersDetail } from './components/PassengersDetail';
import { PaymentDetail } from './components/PaymentDetail';
import { VehicleDetail } from './components/VehicleDetail';
import { router } from '../../../../App';
import { selectAuth } from '../../../../store/auth/selectors';

export default function DetailTicketPage() {
  const { t } = useTranslation(['ticketSales', 'message_error']);
  const theme = useTheme();

  const { orderCode } = useParams();

  const { statusGetTicketSalesOfOrder, statusSendEmail, ticketSalesOfOrder } = useAppSelector(selectTicketSales);
  const dispatch = useDispatch();

  const [openModalPrint, setOpenModalPrint] = useState(false);
  const [ticketDirection, setTicketDirection] = useState<TicketDirection>('DEPARTURE');
  const { userMainRoute } = useAppSelector(selectAuth);

  const record: ColumnTicket | undefined = useMemo(() => {
    if (ticketSalesOfOrder) {
      if (ticketSalesOfOrder.type === 'ONE_TRIP') {
        return ticketSaleModelToColumnTicket(ticketSalesOfOrder.data);
      }
      if (ticketSalesOfOrder.type === 'ROUND_TRIP') {
        return ticketSaleModelToColumnTicket(
          ticketDirection === 'DEPARTURE' ? ticketSalesOfOrder.data.departureTrip : ticketSalesOfOrder.data.returnTrip,
        );
      }
    }
    return undefined;
  }, [ticketSalesOfOrder, ticketDirection]);

  const handleSendEmail = () => {
    if (record) {
      dispatch(
        ticketSalesActions.sendEmailRequest({
          orderCode: record.orderCode,
          onSuccess() {
            toast(<ToastCustom type="success" text={t('ticketSales:send_email_success')} />, {
              className: 'toast-success',
            });
          },
          onFailure: message => {
            toast(<ToastCustom type="error" text={t('ticketSales:send_email_error')} description={message} />, {
              className: 'toast-error',
            });
          },
        }),
      );
    }
  };

  const backToList = () => {
    router.navigate(`${userMainRoute} /ticket-sales`);
  };

  const handleViewRelateOrder = () => {
    setTicketDirection(ticketDirection === 'DEPARTURE' ? 'RETURN' : 'DEPARTURE');
  };

  useEffect(() => {
    if (orderCode) {
      dispatch(ticketSalesActions.getTicketSaleWithOrderCodeRequest({ orderCode }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderCode]);

  if (!orderCode || (!record && statusGetTicketSalesOfOrder === 'success') || statusGetTicketSalesOfOrder === 'failure') {
    return <EmptyScreen description={t('message_error:TICKET_SALE_NOT_FOUND')} />;
  }

  if (!record) {
    return <LoadingScreen />;
  }

  return (
    <LayoutDetail title={`${t('ticketSales:order')} #${record.orderCode}`} subTitle={t('ticketSales:ticket_sales')}>
      <Box width="100%">
        <Grid container spacing="24px">
          <Grid item xs={12} sm={6}>
            <OrderDetails record={record} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Stack direction="column" spacing="24px">
              <PaymentDetail record={record} />
              <VehicleDetail record={record} />
              <PassengersDetail record={record} />
            </Stack>
            <Stack flexWrap="wrap" direction="row" alignItems="center" justifyContent="flex-end" gap={2} my="24px">
              {record.ticketType === 'ROUND_TRIP' && (
                <Button
                  onClick={handleViewRelateOrder}
                  variant="outlined"
                  sx={{
                    flex: '1 1 120px',
                    padding: '12px 16px',
                    backgroundColor: '#fff',
                    '&:hover': {
                      backgroundColor: '#fff',
                      color: '#1AA6EE',
                    },
                  }}
                  startIcon={<ArrowOutward />}
                >
                  {t('ticketSales:view_relate_order')}
                </Button>
              )}
              <Button onClick={backToList} variant="contained" backgroundButton="#01314A" sx={{ padding: '12px 16px' }} startIcon={<ListIcon />}>
                {t('ticketSales:order_list')}
              </Button>
              <Button
                onClick={handleSendEmail}
                loading={statusSendEmail === 'loading'}
                variant="outlined"
                sx={{
                  flex: '1 1 120px',
                  padding: '12px 16px',
                  backgroundColor: '#fff',
                  '&:hover': {
                    backgroundColor: '#fff',
                    color: '#1AA6EE',
                  },
                }}
                startIcon={<SendIcon fillColor="#1AA6EE" />}
              >
                {t('ticketSales:email_ticket')}
              </Button>
              <Button
                onClick={() => setOpenModalPrint(true)}
                variant="contained"
                backgroundButton="#1AA6EE"
                sx={{
                  flex: '1 1 120px',
                  padding: '12px 16px',
                }}
                startIcon={<PrintIcon />}
              >
                {t('ticketSales:print_ticket')}
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </Box>
      <ModalPrintTicket
        open={openModalPrint}
        onClose={() => setOpenModalPrint(false)}
        title={t('ticketSales:ticket_order').toUpperCase()}
        totalPrice={record.totalPrice}
        qrCode={getQrCodeData(record.rawData)}
      >
        <Infomation
          left={t('ticketSales:order_id')}
          right={
            <Typography py="8px" fontSize={14} color={theme.palette.grey[300]}>
              {record.orderCode}
            </Typography>
          }
        />
        <Infomation
          left={t('ticketSales:lastName')}
          right={
            <Typography py="8px" fontSize={14} color={theme.palette.grey[300]}>
              {record.lastName}
            </Typography>
          }
        />
        <Infomation
          left={t('ticketSales:firstName')}
          right={
            <Typography py="8px" fontSize={14} color={theme.palette.grey[300]}>
              {record.firstName}
            </Typography>
          }
        />
        <Infomation
          left={t('ticketSales:trip')}
          right={
            <>
              <Box mb="8px">
                <TextWithIcon text={record.departurePoint} icon={MapPinIcon} color="#1AA6EE" typography={{ fontSize: '14px' }} />
              </Box>
              <TextWithIcon text={record.arrivalPoint} icon={MapPinIcon} color="#1AA6EE" typography={{ fontSize: '14px' }} />
            </>
          }
        />
        <Infomation
          left={t('ticketSales:departureTime')}
          right={
            <Typography py="8px" fontSize={14} color={theme.palette.grey[300]}>
              {dayjs(record.departureTime).format('DD/MM/YYYY - HH[H]mm')}
            </Typography>
          }
        />
        <Infomation
          left={t('ticketSales:paxCount')}
          right={
            <Typography py="8px" fontSize={14} color={theme.palette.grey[300]}>
              {record.totalPax}
            </Typography>
          }
        />
        <Infomation
          left={t('ticketSales:payment_status')}
          right={
            <Tag
              color={PaymentStatusColorMapping[record.paymentStatus]}
              backgroundColor={PaymentStatusBackgroundColorMapping[record.paymentStatus]}
              text={t(`translation:${PaymentStatusLabelMapping[record.paymentStatus]}`)}
            />
          }
        />
        <Infomation
          left={t('ticketSales:createdBy')}
          right={
            <Typography py="8px" fontSize={14} color={theme.palette.grey[300]}>
              {record.createdBy}
            </Typography>
          }
        />
        <Infomation
          left={t('ticketSales:created_on')}
          right={
            <Typography py="8px" fontSize={14} color={theme.palette.grey[300]}>
              {dayjs(record.createdOn).format('DD/MM/YYYY - HH[H]mm')}
            </Typography>
          }
        />
      </ModalPrintTicket>
    </LayoutDetail>
  );
}
