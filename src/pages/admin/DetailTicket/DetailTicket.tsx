import { Grid, Stack } from '@mui/material';
import { Box } from '@mui/system';
import Button from 'components/Button/Button';
import PrintIcon from 'components/SvgIcon/PrintIcon';
import SendIcon from 'components/SvgIcon/SendIcon';
import LayoutDetail from 'layout/LayoutDetail';
import { get } from 'lodash';
import { Ticket } from 'models/Ticket';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import OrderDetails from './components/OrderDetails';
import PaymentTicket from './components/PaymentTicket';

export default function DetailTicketPage() {
  const location = useLocation();
  const ticketDetail: Ticket = get(location, 'state.record', {});
  const { t } = useTranslation('ticketSales');
  const isSubmit = get(location, 'state.isSubmit', false);
  return (
    <LayoutDetail title={`Order #${ticketDetail.id}`} subTitle={t('ticket_sales')}>
      <Box width="100%">
        <Grid container spacing="24px">
          <Grid item xs={12} sm={6}>
            <OrderDetails record={ticketDetail} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <PaymentTicket />
            {isSubmit && (
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
                  {t('email_ticket')}
                </Button>
                <Button variant="contained" backgroundButton="#1AA6EE" sx={{ padding: '12px 16px' }} startIcon={<PrintIcon />}>
                  {t('print_ticket')}
                </Button>
              </Stack>
            )}
          </Grid>
        </Grid>
      </Box>
    </LayoutDetail>
  );
}
