import { Stack, Typography } from '@mui/material';
import { Switch } from 'antd';
import 'antd/lib/switch/style/css';
import { PaymentStatusLabelMapping } from 'models/PaymentStatus';
import { useTranslation } from 'react-i18next';

export interface PaymentStatusProps {
  isActive: boolean;
  onChange?: (value: boolean) => void;
}

export const PaymentStatus = ({ isActive, onChange }: PaymentStatusProps) => {
  const { t } = useTranslation(['ticketSales']);
  return (
    <Stack direction="row" alignItems="center" justifyContent="space-between">
      <Typography
        sx={{
          color: 'rgba(12, 17, 50, 1)',
          fontSize: '14px',
          fontWeight: 500,
        }}
      >
        {t('ticketSales:payment_status')}
      </Typography>
      <Stack direction="row" alignItems="center">
        <Typography
          sx={{
            color: 'rgba(69, 72, 94, 1)',
            fontSize: '14px',
            marginRight: '4px',
          }}
        >
          {isActive ? t(`translation:${PaymentStatusLabelMapping['APPROVED']}`) : t(`translation:${PaymentStatusLabelMapping['CREATED']}`)}
        </Typography>
        <Switch checked={isActive} onChange={checked => onChange?.(checked)} />
      </Stack>
    </Stack>
  );
};
