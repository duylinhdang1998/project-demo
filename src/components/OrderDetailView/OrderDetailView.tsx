import { Divider, Grid, Typography } from '@mui/material';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { MapPinIcon } from 'assets';
import Tag from 'components/Tag/Tag';
import TextWithIcon from 'components/TextWithIcon/TextWithIcon';
import { getPaymentStatusTag } from 'pages/admin/TicketSales/utils/getPaymentStatusTag';
import { PaymentStatus } from 'models/PaymentStatus';

interface OrderDetailViewProps {
  data: any;
}

function OrderDetailView({ data }: OrderDetailViewProps) {
  const { t } = useTranslation(['ticketSales', 'dashboard']);

  const renderInfo = (key: string) => {
    switch (key) {
      case 'departure_point':
        return <TextWithIcon text={data[key]} icon={MapPinIcon} color="#1AA6EE" />;
      case 'payment_status': {
        const { backgroundColor, color } = getPaymentStatusTag(data[key] as PaymentStatus);
        return <Tag text={data[key]} backgroundColor={backgroundColor} color={color} />;
      }
      default:
        return <Typography variant="body2">{data[key]}</Typography>;
    }
  };

  return (
    <div>
      <Typography variant="h5">{t('order_details')}</Typography>
      <Divider sx={{ margin: '16px 0' }} />
      {Object.keys(data).map(key => (
        <Grid container spacing={2} key={key} marginY="2px">
          <Grid item xs={4}>
            <Typography variant="body2">{t(`dashboard:${key}`)}:</Typography>
          </Grid>
          <Grid item xs={8}>
            {renderInfo(key)}
          </Grid>
        </Grid>
      ))}
    </div>
  );
}

export default memo(OrderDetailView);
