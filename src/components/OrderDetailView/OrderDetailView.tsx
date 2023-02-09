import { Divider, Grid, Typography } from '@mui/material';
import { MapPinIcon } from 'assets';
import Tag from 'components/Tag/Tag';
import TextWithIcon from 'components/TextWithIcon/TextWithIcon';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';

interface OrderDetailViewProps {
  data: any;
}

function OrderDetailView({ data }: OrderDetailViewProps) {
  const { t } = useTranslation(['ticketSales']);

  const renderInfo = (key: string) => {
    switch (key) {
      case 'departures_point':
        return <TextWithIcon text={data[key]} icon={MapPinIcon} color="#1AA6EE" />;
      case 'payment_status':
        return <Tag text={data[key]} variant={'success'} />;
      default:
        return <Typography variant="body2">{data[key]}</Typography>;
    }
  };

  return (
    <div>
      <Typography variant="h5">{t('order_details')}</Typography>
      <Divider sx={{ margin: '16px 0' }} />
      {Object.keys(data).map((key) => (
        <Grid container spacing={2} key={key} marginY="2px">
          <Grid item xs={4}>
            <Typography variant="body2">{t(`${key}`)}:</Typography>
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
