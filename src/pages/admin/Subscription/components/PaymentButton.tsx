import { Box, Typography } from '@mui/material';
import Button from 'components/Button/Button';
import ToastCustom from 'components/ToastCustom/ToastCustom';
import { useAppSelector } from 'hooks/useAppSelector';
import { useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { selectSubscriptions } from 'store/subscriptions/selectors';
import { PaymentMethod } from '../@types/PaymentMethod';

interface PaymentButtonProps {
  variant: PaymentMethod;
}

export const PaymentButton = ({ variant }: PaymentButtonProps) => {
  const { t } = useTranslation(['account']);

  const navigate = useNavigate();

  const { statusCreateSubscriptionOrder, subscriptionOrder } = useAppSelector(selectSubscriptions);

  const paymentTypeTranslated = useMemo(() => {
    return t(`account:${variant}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [t]);

  useEffect(() => {
    if (statusCreateSubscriptionOrder === 'failure') {
      toast(<ToastCustom type="error" text={t('account:create_subscription_order_failure')} />, {
        className: 'toast-error',
      });
      setTimeout(() => {
        navigate(0);
      }, 2000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statusCreateSubscriptionOrder]);

  return (
    <Box my="10px">
      <Typography marginBottom="12px" variant="body2" fontWeight={700}>
        {t('account:payment_title', { type: paymentTypeTranslated })}
      </Typography>
      <Typography marginBottom="12px" variant="body2">
        {t('account:payment_description', { type: paymentTypeTranslated })}
      </Typography>
      <Button
        loading={statusCreateSubscriptionOrder === 'loading'}
        backgroundButton="rgba(38, 59, 128, 1)"
        sx={{ padding: '10px 18px' }}
        onClick={() => {
          const href =
            typeof subscriptionOrder?.paymentLink === 'string'
              ? subscriptionOrder?.paymentLink
              : subscriptionOrder?.paymentLink.find(({ rel }) => rel === 'approve')?.href;
          if (href) {
            window.location.href = href;
          }
        }}
      >
        <Typography fontWeight={500} marginRight="4px">
          {t('account:connect_with_payment')}
        </Typography>
        <Typography fontWeight={700}>{paymentTypeTranslated}</Typography>
      </Button>
    </Box>
  );
};
