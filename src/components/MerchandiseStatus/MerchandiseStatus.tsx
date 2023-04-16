import { Box } from '@mui/material';
import { useTranslation } from 'react-i18next';

interface MerchandiseStatusProps {
  status: 'CANCELLED' | 'DELIVERIED' | 'DELIVERING' | 'NOT_DELIVERIED';
}

export const MerchandiseStatus = ({ status }: MerchandiseStatusProps) => {
  const { t } = useTranslation(['packageSales']);

  const labelMapping: Record<MerchandiseStatusProps['status'], string> = {
    CANCELLED: t('packageSales:merchandise_cancelled'),
    DELIVERIED: t('packageSales:merchandise_delivertied'),
    DELIVERING: t('packageSales:merchandise_delivering'),
    NOT_DELIVERIED: t('packageSales:merchandise_not_deliveried'),
  };

  const backgroundMapping: Record<MerchandiseStatusProps['status'], string> = {
    CANCELLED: 'rgba(255, 39, 39, 0.1)',
    DELIVERIED: 'rgba(51, 204, 127, 0.1)',
    DELIVERING: 'rgba(255, 182, 0, 0.1)',
    NOT_DELIVERIED: 'rgba(232, 246, 253, 1)',
  };

  const colorMapping: Record<MerchandiseStatusProps['status'], string> = {
    CANCELLED: 'rgba(255, 39, 39, 1)',
    DELIVERIED: 'rgba(51, 204, 127, 1)',
    DELIVERING: 'rgba(255, 182, 0, 1)',
    NOT_DELIVERIED: 'rgba(45, 154, 255, 1)',
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
