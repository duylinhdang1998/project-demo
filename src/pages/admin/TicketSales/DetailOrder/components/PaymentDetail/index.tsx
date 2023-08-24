import { Divider, Typography, useTheme } from '@mui/material';
import { Box } from '@mui/system';
import dayjs from 'dayjs';
import { ColumnTicket } from 'pages/admin/TicketSales/components/ColumnTicket';
import { useTranslation } from 'react-i18next';
import { useCurrency } from 'hooks/useCurrency';
export interface PaymentDetailProps {
  record: ColumnTicket;
}

export const PaymentDetail = ({ record }: PaymentDetailProps) => {
  const theme = useTheme();
  const { t } = useTranslation(['ticketSales']);
  const { currencyFormat } = useCurrency();

  return (
    <Box p="24px" bgcolor="#fff" borderRadius="4px">
      <Typography fontSize={16} color={theme.palette.grey[100]} fontWeight="700" pb="24px">
        {t('ticketSales:payment_details')}
      </Typography>
      <Divider sx={{ borderColor: '#D7DADC' }} />
      <Box display="flex" justifyContent="space-between" alignItems="center" pt="24px">
        <Typography fontSize={14} color={theme.palette.grey[300]} fontWeight="400" mb="8px">
          {t('ticketSales:created_on')}
        </Typography>
        <Typography fontSize={14} color={theme.palette.grey[300]} fontWeight="400">
          {dayjs(record.createdOn).format('DD/MM/YYYY - HH[H]mm')}
        </Typography>
      </Box>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography color={theme.palette.grey[300]} fontWeight="700">
          {t('ticketSales:total')}
        </Typography>
        <Typography fontSize={24} color="#FF2727" fontWeight="700">
          {currencyFormat(record.totalPrice)}
        </Typography>
      </Box>
    </Box>
  );
};
