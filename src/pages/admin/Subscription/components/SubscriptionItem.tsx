import CheckIcon from '@mui/icons-material/Check';
import { Box, Stack, Typography } from '@mui/material';
import Button from 'components/Button/Button';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

interface SubscriptionItemProps {
  name?: string;
  cash?: number;
  popular?: boolean;
  benefits: { id: string; text: string }[];
}

export default function SubscriptionItem({ name, cash, benefits, popular }: SubscriptionItemProps) {
  const { t } = useTranslation(['account', 'translation']);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/account/subscription-payment');
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
          {t('popular_choice')}
        </Box>
      )}
      <Typography color="#0C1132" fontSize={20} fontWeight={700} textTransform="uppercase">
        {name}
      </Typography>

      <Box display="flex" justifyContent="center" alignItems="center">
        <Typography component="span" fontSize={16} fontWeight="bold">
          $
        </Typography>
        <Typography component="span" fontSize={48} fontWeight="bold">
          {cash}
        </Typography>
        <Typography component="span" fontSize={14} fontWeight="bold" alignSelf="flex-end">
          /month
        </Typography>
      </Box>
      <Box my="16px">
        {benefits.map((b) => (
          <Stack direction="row" alignItems="center" spacing={3} key={b.id} my="10px">
            <CheckIcon sx={{ color: '#33CC7F', fontSize: '12px' }} />
            <Typography variant="body2">{b.text}</Typography>
          </Stack>
        ))}
      </Box>
      <Button variant={popular ? 'contained' : 'outlined'} fullWidth sx={{ color: !popular ? '#1AA6EE' : '#fff' }} onClick={handleClick}>
        {t('buy_now')}
      </Button>
    </Box>
  );
}
