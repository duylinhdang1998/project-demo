import { Divider, Typography, useTheme } from '@mui/material';
import { Box } from '@mui/system';
import { MapPinIcon } from 'assets';
import Tag from 'components/Tag/Tag';
import TextWithIcon from 'components/TextWithIcon/TextWithIcon';
import dayjs from 'dayjs';
import { getPaymentStatusTag } from 'pages/admin/TicketSales/utils/getPaymentStatusTag';
import { memo, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { ColumnTicket } from '../../../components/ColumnTicket';
import { Infomation } from './Infomation';

export interface OrderDetailsProps {
  record: ColumnTicket;
}

function OrderDetails({ record }: OrderDetailsProps) {
  const theme = useTheme();
  const { t } = useTranslation(['ticketSales']);

  const { backgroundColor, color } = useMemo(() => {
    return getPaymentStatusTag(record.paymentStatus);
  }, [record.paymentStatus]);

  return (
    <Box padding="24px" bgcolor="#fff" borderRadius="4px">
      <Typography fontSize={16} color={theme.palette.grey[100]} fontWeight="700" pb="24px">
        {t('ticketSales:order_details')}
      </Typography>
      <Divider sx={{ borderColor: '#D7DADC' }} />
      <Box py="24px">
        <Infomation
          left={t('ticketSales:order_id')}
          right={
            <Typography py="8px" fontSize={14} color={theme.palette.grey[300]}>
              {record.orderId}
            </Typography>
          }
        />
        <Infomation
          left={t('ticketSales:lastName')}
          right={
            <Typography py="8px" fontSize={14} color={theme.palette.grey[300]}>
              {record.lastName}
            </Typography>
          }
        />
        <Infomation
          left={t('ticketSales:firstName')}
          right={
            <Typography py="8px" fontSize={14} color={theme.palette.grey[300]}>
              {record.firstName}
            </Typography>
          }
        />
        <Infomation
          left={t('ticketSales:trip')}
          right={
            <>
              <TextWithIcon text={record.departurePoint} icon={MapPinIcon} color="#1AA6EE" typography={{ fontSize: '14px' }} />
              <TextWithIcon text={record.arrivalPoint} icon={MapPinIcon} color="#1AA6EE" typography={{ fontSize: '14px' }} />
            </>
          }
        />
        <Infomation
          left={t('ticketSales:dateTime')}
          right={
            <Typography py="8px" fontSize={14} color={theme.palette.grey[300]}>
              {dayjs(record.dateTime).format('MM/DD/YYYY - HH:mm')}
            </Typography>
          }
        />
        <Infomation
          left={t('ticketSales:paxCount')}
          right={
            <Typography py="8px" fontSize={14} color={theme.palette.grey[300]}>
              {dayjs(record.dateTime).format('MM/DD/YYYY - HH:mm')}
            </Typography>
          }
        />
        <Infomation
          left={t('ticketSales:payment_status')}
          right={
            <Tag
              color={color}
              backgroundColor={backgroundColor}
              // FIXME: I18n
              text={record.paymentStatus}
            />
          }
        />
        <Infomation
          left={t('ticketSales:createdBy')}
          right={
            <Typography py="8px" fontSize={14} color={theme.palette.grey[300]}>
              {record.createdBy}
            </Typography>
          }
        />
      </Box>
    </Box>
  );
}

export default memo(OrderDetails);
