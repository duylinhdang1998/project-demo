import { Divider, Grid, Typography } from '@mui/material';
import { MapPinIcon } from 'assets';
import Tag from 'components/Tag/Tag';
import TextWithIcon from 'components/TextWithIcon/TextWithIcon';
import { DeliveryStatus } from 'models/PackageSales';
import { PaymentStatus, PaymentStatusBackgroundColorMapping, PaymentStatusColorMapping, PaymentStatusLabelMapping } from 'models/PaymentStatus';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';

export interface OrderDetailViewProps {
  data: {
    order_id: string;
    trip: [string, string];
    date: string;
    sender_name: string;
    sender_mobile: string;
    recipent_name: string;
    recipent_mobile: string;
    quantity: number;
    weight: string;
    price: string;
    payment_status: PaymentStatus;
    delivery_status: DeliveryStatus;
  };
}

function OrderDetailView({ data }: OrderDetailViewProps) {
  const { t } = useTranslation(['ticketSales', 'dashboard']);

  const renderInfo = (key: string) => {
    switch (key) {
      case 'trip': {
        const [departure, arrival] = data[key];
        return (
          <>
            <TextWithIcon text={departure} icon={MapPinIcon} color="#1AA6EE" />
            <TextWithIcon text={arrival} icon={MapPinIcon} color="#1AA6EE" />
          </>
        );
      }
      case 'payment_status':
        return (
          <Tag
            text={PaymentStatusLabelMapping[data[key]]}
            backgroundColor={PaymentStatusBackgroundColorMapping[data[key]]}
            color={PaymentStatusColorMapping[data[key]]}
          />
        );
      case 'delivery_status':
        return null;
      default:
        return <Typography variant="body2">{data[key]}</Typography>;
    }
  };

  return (
    <div>
      <Typography variant="h5">{t('order_details')}</Typography>
      <Divider sx={{ margin: '16px 0' }} />
      {Object.keys(data).map(key => {
        if (key === 'delivery_status') {
          return null;
        }
        return (
          <Grid container spacing={2} key={key} marginY="2px">
            <Grid item xs={4}>
              <Typography variant="body2">{t(`dashboard:${key}`)}:</Typography>
            </Grid>
            <Grid item xs={8}>
              {renderInfo(key)}
            </Grid>
          </Grid>
        );
      })}
    </div>
  );
}

export default memo(OrderDetailView);
