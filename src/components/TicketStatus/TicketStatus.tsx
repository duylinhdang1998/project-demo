import { Box } from '@mui/material';
import { useTranslation } from 'react-i18next';

interface TicketStatusProps {
  status: 'CANCELLED' | 'USED' | 'PENDING';
}

export const TicketStatus = ({ status }: TicketStatusProps) => {
  const { t } = useTranslation(['ticketSales']);

  const labelMapping: Record<TicketStatusProps['status'], string> = {
    CANCELLED: t('ticketSales:ticket_cancelled'),
    USED: t('ticketSales:ticket_used'),
    PENDING: t('ticketSales:ticket_pending'),
  };

  const backgroundMapping: Record<TicketStatusProps['status'], string> = {
    CANCELLED: 'rgba(255, 39, 39, 0.1)',
    USED: 'rgba(51, 204, 127, 0.1)',
    PENDING: 'rgba(255, 182, 0, 0.1)',
  };

  const colorMapping: Record<TicketStatusProps['status'], string> = {
    CANCELLED: 'rgba(255, 39, 39, 1)',
    USED: 'rgba(51, 204, 127, 1)',
    PENDING: 'rgba(255, 182, 0, 1)',
  };

  return (
    <Box
      sx={{
        backgroundColor: backgroundMapping[status],
        color: colorMapping[status],
        fontSize: '12px',
        fontWeight: 700,
        padding: '8px',
        border: `1px solid currentColor`,
        borderRadius: '4px',
      }}
    >
      {labelMapping[status]}
    </Box>
  );
};
