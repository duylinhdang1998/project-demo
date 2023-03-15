import AddIcon from '@mui/icons-material/Add';
import { Grid, useTheme } from '@mui/material';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import Button from 'components/Button/Button';
import DeliveryIcon from 'components/SvgIcon/DeliveryIcon';
import MerchaindiseOrderIcon from 'components/SvgIcon/MerchaindiseOrderIcon';
import TicketIconSvg from 'components/SvgIcon/TicketIcon';

function ListButton() {
  const theme = useTheme();
  const { t } = useTranslation(['dashboard']);
  const navigate = useNavigate();

  const handleCreateTicketOrder = () => {
    navigate('/agent/create-ticket-order');
  };

  const handleCreateMerchandise = () => {
    navigate('/agent/create-package-orders');
  };

  const handleControlTicket = () => {
    navigate('/agent/control-ticket');
  };

  const handleControlMerchandise = () => {
    navigate('/agent/control-merchandise-delivery');
  };

  return (
    <Grid container spacing="24px">
      <Grid item xs={12} sm={6} md={3}>
        <Button
          fullWidth
          backgroundButton={theme.palette.primary.main}
          startIcon={<AddIcon sx={{ fontSize: '24px' }} />}
          sx={{ height: '40px' }}
          onClick={handleCreateTicketOrder}
        >
          {t('create_ticket_order')}
        </Button>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <Button
          fullWidth
          backgroundButton={theme.palette.primary.main}
          startIcon={<MerchaindiseOrderIcon />}
          sx={{ height: '40px' }}
          onClick={handleCreateMerchandise}
        >
          {t('create_merchandise')}
        </Button>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <Button
          fullWidth
          backgroundButton={theme.palette.success.main}
          startIcon={<TicketIconSvg />}
          sx={{ height: '40px' }}
          onClick={handleControlTicket}
        >
          {t('control_ticket')}
        </Button>
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <Button
          fullWidth
          backgroundButton={theme.palette.success.main}
          startIcon={<DeliveryIcon />}
          sx={{ height: '40px' }}
          onClick={handleControlMerchandise}
        >
          {t('control_merchandise_deliver')}
        </Button>
      </Grid>
    </Grid>
  );
}

export default memo(ListButton);
