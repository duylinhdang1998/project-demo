import CheckIcon from '@mui/icons-material/Check';
import { Box, Stack, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import Button from 'components/Button/Button';
import { SubscriptionFeature, SubscriptionType, UNLIMITED } from 'services/models/Subscription';
import { PlanDuration } from '../@types/PlanDuration';

interface SubscriptionItemProps {
  name: string;
  currency: string;
  price: number;
  planDuration: PlanDuration;
  subscriptionFeatures: SubscriptionFeature[];
  subscriptionType: SubscriptionType;
  popular: boolean;
  disabled: boolean;
  isRegistered: boolean;
}
export default function SubscriptionItem({
  name,
  currency,
  price,
  planDuration,
  subscriptionFeatures,
  subscriptionType,
  popular,
  disabled,
  isRegistered,
}: SubscriptionItemProps) {
  const { t } = useTranslation(['account', 'translation']);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/account/subscription-payment/${subscriptionType}`, { state: planDuration });
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      borderRadius="8px"
      border={`2px solid ${popular ? '#1AA6EE' : '#D7DADC'}`}
      padding="50px 24px"
      position="relative"
      height="460px"
    >
      {popular && (
        <Box bgcolor="#1AA6EE" padding="10px 8px" position="absolute" width="100%" top={0} left={0} textAlign="center" color="#fff">
          {t('translation:popular_choice')}
        </Box>
      )}
      <Typography color="#0C1132" fontSize={20} fontWeight={700} textTransform="uppercase">
        {t(`translation:${name}`)}
      </Typography>

      <Box display="flex" justifyContent="center" alignItems="center">
        <Typography component="span" fontSize={16} fontWeight="bold">
          {currency}
        </Typography>
        <Typography component="span" fontSize={48} fontWeight="bold">
          {price}
        </Typography>
        <Typography component="span" fontSize={14} fontWeight="bold" alignSelf="flex-end">
          /{t(`translation:${planDuration}`)}
        </Typography>
      </Box>
      <Box my="16px">
        {subscriptionFeatures.map(b => (
          <Stack direction="row" alignItems="center" spacing={3} key={b.name} my="10px">
            <CheckIcon sx={{ color: '#33CC7F', fontSize: '12px' }} />
            <Typography variant="body2">
              {t(`translation:${b.key === 'VEHICLE' ? (b.value > 1 ? 'VEHICLES' : 'VEHICLE') : b.key}`, {
                count: b.value === UNLIMITED ? t('translation:unlimited') : b.value,
              })}
            </Typography>
          </Stack>
        ))}
      </Box>
      <Button
        disabled={disabled}
        variant={popular ? 'contained' : 'outlined'}
        fullWidth
        sx={{ color: !popular ? '#1AA6EE' : '#fff' }}
        onClick={handleClick}
      >
        {isRegistered ? t('account:subscription_registered') : t('translation:buy_now')}
      </Button>
    </Box>
  );
}
