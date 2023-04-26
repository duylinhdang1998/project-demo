import { Box, Stack, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { getAppCurrencySymbol } from 'utils/getAppCurrencySymbol';

interface TotalPriceProps {
  value: number;
}

export const TotalPrice = ({ value }: TotalPriceProps) => {
  const { t } = useTranslation(['ticketSales']);
  return (
    <Box>
      <Stack direction="row" alignItems="center" spacing={10} marginTop="20px">
        <Typography variant="body2">{t('ticketSales:total_price')}</Typography>
        <Typography variant="price">
          {getAppCurrencySymbol()}
          {value}
        </Typography>
      </Stack>

      <Typography variant="headerTable" sx={{ fontSize: '12px !important', color: 'rgba(178, 186, 190, 1)' }}>
        {t('all_taxes_and_fees')}
      </Typography>
    </Box>
  );
};
