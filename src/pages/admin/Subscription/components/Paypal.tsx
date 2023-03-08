import { Box, Typography } from '@mui/material';
import Button from 'components/Button/Button';
import { useAppSelector } from 'hooks/useAppSelector';
import { useTranslation } from 'react-i18next';
import { selectSubscriptions } from 'store/subscriptions/selectors';

export const Paypal = () => {
  const { t } = useTranslation(['account']);

  const { statusCreateSubscriptionOrder, subscriptionOrder } = useAppSelector(selectSubscriptions);

  return (
    <Box my="10px">
      <Typography variant="body2" fontWeight={700}>
        {t('account:paypal_title')}
      </Typography>
      <Typography variant="body2">{t('account:paypal_description')}</Typography>
      <Button
        loading={statusCreateSubscriptionOrder === 'loading'}
        backgroundButton="#0A89CA"
        sx={{ fontStyle: 'italic', padding: '10px 18px' }}
        onClick={() => {
          const href = subscriptionOrder?.paymentLink.find(({ rel }) => rel === 'approve')?.href;
          if (href) {
            window.location.href = href;
          }
        }}
      >
        {t('account:PayPal')}
      </Button>
    </Box>
  );
};
