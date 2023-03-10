import { Grid } from '@mui/material';
import { Box } from '@mui/system';
import { useAppSelector } from 'hooks/useAppSelector';
import LayoutDetail from 'layout/LayoutDetail';
import { useTranslation } from 'react-i18next';
import { Navigate, useLocation } from 'react-router-dom';
import { selectAuth } from 'store/auth/selectors';
import { ColumnTicket } from '../components/ColumnTicket';
import OrderDetails from './components/OrderDetail';
import { PaymentDetail } from './components/PaymentDetail';

export default function DetailTicketPage() {
  const { t } = useTranslation(['ticketSales']);

  const location = useLocation();

  const { userInfo } = useAppSelector(selectAuth);

  const record = location.state as ColumnTicket | undefined;
  const isAgent = userInfo?.role === 'agent';

  if (!record) {
    return <Navigate to={isAgent ? '/agent/ticket-sales' : '/admin/ticket-sales'} />;
  }

  return (
    <LayoutDetail title={`Order ${record.orderId}`} subTitle={t('ticketSales:ticket_sales')}>
      <Box width="100%">
        <Grid container spacing="24px">
          <Grid item xs={12} sm={6}>
            <OrderDetails record={record} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <PaymentDetail record={record} />
          </Grid>
        </Grid>
      </Box>
    </LayoutDetail>
  );
}
