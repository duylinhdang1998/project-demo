import { Grid, Stack } from '@mui/material';
import { Box } from '@mui/system';
import Button from 'components/Button/Button';
import { LoadingScreen } from 'components/LoadingScreen/LoadingScreen';
import PrintIcon from 'components/SvgIcon/PrintIcon';
import SendIcon from 'components/SvgIcon/SendIcon';
import { useAppSelector } from 'hooks/useAppSelector';
import LayoutDetail from 'layout/LayoutDetail';
import { useEffect, useMemo, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { Navigate, useLocation, useParams } from 'react-router-dom';
import ReactToPrint from 'react-to-print';
import { selectTicketSales } from 'store/ticketSales/selectors';
import { ticketSalesActions } from 'store/ticketSales/ticketSalesSlice';
import { ColumnTicket } from '../components/ColumnTicket';
import { ticketSaleModelToColumnTicket } from '../utils/ticketSaleModelToColumnTicket';
import OrderDetails from './components/OrderDetail';
import { PaymentDetail } from './components/PaymentDetail';
import { PrintPDF } from './components/PrintPDF';

export default function DetailTicketPage() {
  const { t } = useTranslation(['ticketSales']);

  const location = useLocation();
  const { orderCode } = useParams();

  const { statusGetTicketSale, ticketSale } = useAppSelector(selectTicketSales);
  const dispatch = useDispatch();

  const record: ColumnTicket | undefined = useMemo(() => {
    if (location.state) {
      return location.state as ColumnTicket;
    }
    if (ticketSale) {
      return ticketSaleModelToColumnTicket(ticketSale);
    }
    return undefined;
  }, [location.state, ticketSale]);

  const printPDFRef = useRef<PrintPDF | null>(null);

  useEffect(() => {
    if (!record && orderCode) {
      dispatch(ticketSalesActions.getTicketSaleRequest({ orderCode }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderCode]);

  if (!orderCode || (!record && statusGetTicketSale === 'failure')) {
    return <Navigate to="/404" />;
  }

  if (!record) {
    return <LoadingScreen />;
  }

  return (
    <LayoutDetail title={`Order ${record.orderId}`} subTitle={t('ticketSales:ticket_sales')}>
      <Box width="100%">
        <PrintPDF ref={printPDFRef}>
          <Grid container spacing="24px">
            <Grid item xs={12} sm={6}>
              <OrderDetails record={record} />
            </Grid>
            <Grid item xs={12} sm={6}>
              <PaymentDetail record={record} />
            </Grid>
          </Grid>
        </PrintPDF>
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
            startIcon={<SendIcon fillColor="#1AA6EE" />}
          >
            {t('ticketSales:email_ticket')}
          </Button>
          <ReactToPrint
            trigger={() => {
              return (
                <Button variant="contained" backgroundButton="#1AA6EE" sx={{ padding: '12px 16px' }} startIcon={<PrintIcon />}>
                  {t('ticketSales:print_ticket')}
                </Button>
              );
            }}
            content={() => printPDFRef.current}
          />
        </Stack>
      </Box>
    </LayoutDetail>
  );
}
