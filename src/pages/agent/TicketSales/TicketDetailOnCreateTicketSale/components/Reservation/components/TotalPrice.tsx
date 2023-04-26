import { Stack, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { getAppCurrencySymbol } from 'utils/getAppCurrencySymbol';

interface TotalPriceProps {
  value: number;
}

export const TotalPrice = ({ value }: TotalPriceProps) => {
  const { t } = useTranslation(['ticketSales']);
  return (
    <Stack direction="row" alignItems="center" spacing={10} marginTop="20px">
      <Typography variant="body2">{t('ticketSales:total_price')}</Typography>
      <Typography variant="price">
        {getAppCurrencySymbol()}
        {value}
      </Typography>
    </Stack>
  );
};
