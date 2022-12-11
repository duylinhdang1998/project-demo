import { Divider, Grid, Typography, useTheme } from '@mui/material';
import { Box } from '@mui/system';
import { MapPinIcon } from 'assets';
import Tag from 'components/Tag/Tag';
import TextWithIcon from 'components/TextWithIcon/TextWithIcon';
import dayjs from 'dayjs';
import { Ticket } from 'models/Ticket';
import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';

interface OrderDetailsProps {
  record: Ticket;
}

function OrderDetails({ record }: OrderDetailsProps) {
  const theme = useTheme();
  const { t } = useTranslation('ticketSales');
  const renderValue = (i: string) => {
    switch (i) {
      case 'trip':
        return record?.[i]?.map((o: string, index) => (
          <TextWithIcon
            key={index}
            text={o}
            icon={MapPinIcon}
            color="#1AA6EE"
            typography={{
              fontSize: '14px',
            }}
          />
        ));
      case 'dateTime':
        return (
          <Typography py="8px" fontSize={14} color={theme.palette.grey[300]}>
            {dayjs(record?.[i]).format('MM/DD/YYYY - HH:mm')}
          </Typography>
        );
      case 'payment_status':
        return <Tag color={record[i] === 'Paid' ? '#33CC7F' : '#FF2727'} backgroundColor={record[i] === 'Paid' ? '#F1FFF4' : '#FFEDED'} text={record[i]} />;
      default:
        return (
          <Typography py="8px" fontSize={14} color={theme.palette.grey[300]}>
            {record[i]}
          </Typography>
        );
    }
  };
  return (
    <Box padding="24px" bgcolor="#fff" borderRadius="4px">
      <Typography fontSize={16} color={theme.palette.grey[100]} fontWeight="700" pb="24px">
        {t('order_details')}
      </Typography>
      <Divider sx={{ borderColor: '#D7DADC' }} />
      <Box py="24px">
        {Object.keys(record).map(
          (i) =>
            i !== 'id' && (
              <Grid container key={i}>
                <Grid item xs={4}>
                  <Typography py="8px" fontSize="14px">
                    {t(`${i === 'orderId' ? 'order_id' : i}`)}:
                  </Typography>
                </Grid>
                <Grid item xs={8}>
                  {renderValue(i)}
                </Grid>
              </Grid>
            ),
        )}
      </Box>
    </Box>
  );
}

export default memo(OrderDetails);
