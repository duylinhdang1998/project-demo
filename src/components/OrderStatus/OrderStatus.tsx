import { Box } from '@mui/material';
import { OrderStatus } from 'models/PackageSales';
import { useTranslation } from 'react-i18next';

interface OrderStatusProps {
  status: OrderStatus;
}

export const OrderStatusComp = ({ status }: OrderStatusProps) => {
  const { t } = useTranslation(['packageSales']);

  const labelMapping: Record<OrderStatusProps['status'], string> = {
    CANCELED: t('merchandise_cancelled'),
    SUCCESS: t('order_sucesss'),
  };

  const backgroundMapping: Record<OrderStatusProps['status'], string> = {
    CANCELED: 'rgba(255, 39, 39, 0.1)',
    SUCCESS: '#F1FFF4',
  };

  const colorMapping: Record<OrderStatusProps['status'], string> = {
    CANCELED: 'rgba(255, 39, 39, 1)',
    SUCCESS: 'rgba(51, 204, 127, 1)',
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
