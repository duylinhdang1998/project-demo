import { Box } from '@mui/material';
import { DeliveryStatus } from 'models/PackageSales';
import { useTranslation } from 'react-i18next';

interface MerchandiseStatusProps {
  status: DeliveryStatus;
}

export const MerchandiseStatus = ({ status }: MerchandiseStatusProps) => {
  const { t } = useTranslation(['packageSales']);

  const labelMapping: Record<MerchandiseStatusProps['status'], string> = {
    CANCELED: t('merchandise_cancelled'),
    DELIVERED: t('merchandise_deliveried'),
    DELIVERING: t('merchandise_delivering'),
    PENDING: t('merchandise_pending'),
  };

  const backgroundMapping: Record<MerchandiseStatusProps['status'], string> = {
    CANCELED: 'rgba(255, 39, 39, 0.1)',
    PENDING: '#E8F6FD',
    DELIVERED: 'rgba(51, 204, 127, 0.1)',
    DELIVERING: 'rgba(255, 182, 0, 0.1)',
  };

  const colorMapping: Record<MerchandiseStatusProps['status'], string> = {
    CANCELED: 'rgba(255, 39, 39, 1)',
    DELIVERED: 'rgba(51, 204, 127, 1)',
    DELIVERING: 'rgba(255, 182, 0, 1)',
    PENDING: 'rgba(45, 154, 255, 1)',
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
