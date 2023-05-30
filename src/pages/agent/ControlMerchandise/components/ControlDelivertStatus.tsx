import { Box, Divider, Stack, Typography } from '@mui/material';
import Button from 'components/Button/Button';
import CheckCircle from 'components/SvgIcon/CheckCircle';
import { DeliveryStatus } from 'models/PackageSales';
import { useTranslation } from 'react-i18next';

interface ControlDelivertStatusProps {
  deliveryStatus: DeliveryStatus;
  onChange: (value: DeliveryStatus) => void;
}

export const ControlDelivertStatus = ({ deliveryStatus, onChange }: ControlDelivertStatusProps) => {
  const { t } = useTranslation(['packageSales', 'dashboard']);

  return (
    <Box bgcolor="#fff" borderRadius="4px" padding="24px">
      <Typography variant="h5">{t('packageSales:delivery_status')}</Typography>
      <Divider sx={{ marginTop: '16px' }} />
      <Stack paddingY="16px" direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="body2">{t('packageSales:arrived_destination')}</Typography>
        <Button onClick={() => onChange(DeliveryStatus.DELIVERING)}>
          <CheckCircle success={deliveryStatus === DeliveryStatus.DELIVERING} />
        </Button>
      </Stack>
      <Stack
        paddingY="16px"
        sx={{ borderTop: '1px solid rgba(215, 218, 220, 1)' }}
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography variant="body2">{t('packageSales:delivered_recipient')}</Typography>
        <Button onClick={() => onChange(DeliveryStatus.DELIVERED)}>
          <CheckCircle success={deliveryStatus === DeliveryStatus.DELIVERED} />
        </Button>
      </Stack>
      <Stack
        paddingY="16px"
        sx={{ borderTop: '1px solid rgba(215, 218, 220, 1)' }}
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography variant="body2">{t('packageSales:cancel_to_delivery')}</Typography>
        <Button onClick={() => onChange(DeliveryStatus.CANCELED)}>
          <CheckCircle success={deliveryStatus === DeliveryStatus.CANCELED} />
        </Button>
      </Stack>
    </Box>
  );
};
