import { Stack, Typography } from '@mui/material';
import { Switch } from 'antd';
import 'antd/lib/switch/style/css';
import { PaymentStatusLabelMapping } from 'models/PaymentStatus';
import { Control, FieldErrors } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { TicketDetailFormValues } from '../TicketDetailOnCreateTicketSale';

export interface PaymentStatusProps {
  control: Control<TicketDetailFormValues>;
  errors: FieldErrors<TicketDetailFormValues>;
  messages: Record<string, string>;
  label: 'isActive';
  isActive: TicketDetailFormValues['isActive'];
  onChange: (value: TicketDetailFormValues['isActive']) => void;
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
        {/* FIXME: Chưa có quy ước */}
        <Typography
          sx={{
            color: 'rgba(69, 72, 94, 1)',
            fontSize: '14px',
          }}
        >
          {PaymentStatusLabelMapping['APPROVED']}
        </Typography>
        <Switch checked={isActive} onChange={checked => onChange(checked)} />
      </Stack>
    </Stack>
  );
};
