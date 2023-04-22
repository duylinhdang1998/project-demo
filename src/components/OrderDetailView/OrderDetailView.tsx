import { Divider, Grid, Stack, Typography } from '@mui/material';
import { MapPinIcon } from 'assets';
import { MerchandiseStatus } from 'components/MerchandiseStatus/MerchandiseStatus';
import Tag from 'components/Tag/Tag';
import TextWithIcon from 'components/TextWithIcon/TextWithIcon';
import dayjs from 'dayjs';
import { PackageSale } from 'models/PackageSales';
import { PaymentStatusBackgroundColorMapping, PaymentStatusColorMapping, PaymentStatusLabelMapping } from 'models/PaymentStatus';
import { memo, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

export interface OrderDetailViewProps {
  data: PackageSale;
}

function OrderDetailView({ data }: OrderDetailViewProps) {
  const { t } = useTranslation(['ticketSales', 'dashboard', 'packageSales']);

  const mappingData = useMemo(() => {
    return {
      orderCode: data.orderCode,
      trip: [data.departurePoint, data.arrivalPoint],
      date: dayjs(data.departureTime).format('MM/DD/YYYY - HH:mm'),
      sender_name: `${data.sender.firstName} ${data.sender.lastName}`,
      sender_mobile: data.sender.mobile,
      recipent_name: `${data.recipent.firstName} ${data.recipent.lastName}`,
      recipent_mobile: data.recipent.mobile,
      quantity: data.totalQuantity,
      weight: `${data.totalWeight} kg`,
      price: `$${data.totalPrice}`,
      payment_status: data.paymentStatus,
    };
  }, [data]);

  const renderInfo = (key: string) => {
    switch (key) {
      case 'trip': {
        const [departure, arrival] = mappingData['trip'];
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
            text={PaymentStatusLabelMapping[mappingData[key]]}
            backgroundColor={PaymentStatusBackgroundColorMapping[mappingData[key]]}
            color={PaymentStatusColorMapping[mappingData[key]]}
          />
        );
      default:
        return <Typography variant="body2">{mappingData[key]}</Typography>;
    }
  };

  return (
    <div>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="h5">
          {t('order_details')} #{data.orderCode}
        </Typography>
        <MerchandiseStatus status={data.deliveryStatus} />
      </Stack>
      <Divider sx={{ margin: '16px 0' }} />
      {!!data &&
        Object.keys(mappingData).map(key => {
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
