import { Divider, Stack, Typography, useTheme } from '@mui/material';
import { Box } from '@mui/system';
import { MapPinIcon } from 'assets';
import QRCode from 'react-qr-code';
import Tag from 'components/Tag/Tag';
import TextWithIcon from 'components/TextWithIcon/TextWithIcon';
import { TicketStatus } from 'components/TicketStatus/TicketStatus';
import dayjs from 'dayjs';
import { PaymentStatusBackgroundColorMapping, PaymentStatusColorMapping, PaymentStatusLabelMapping } from 'models/PaymentStatus';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { ColumnTicket } from '../../../components/ColumnTicket';
import { Infomation } from './Infomation';
import { UserRoleMappingToLabel } from 'services/models/UserRole';

export interface OrderDetailsProps {
  record: ColumnTicket;
}

function OrderDetails({ record }: OrderDetailsProps) {
  const theme = useTheme();
  const { t } = useTranslation(['ticketSales']);

  return (
    <Box padding="24px" bgcolor="#fff" borderRadius="4px">
      <Stack direction="row" alignItems="center" justifyContent="space-between" pb="24px">
        <Typography fontSize={16} color={theme.palette.grey[100]} fontWeight="700">
          {t('ticketSales:order')} #{record.orderCode}
        </Typography>
        <TicketStatus status={record.ticketStatus} />
      </Stack>
      <Divider sx={{ borderColor: '#D7DADC' }} />
      <Box mt="24px" sx={{ maxWidth: 120, maxHeight: 120, marginLeft: 'auto', marginRight: 'auto' }}>
        <QRCode size={120} value={record.orderCode} />
      </Box>
      <Box py="24px">
        <Infomation
          left={t('ticketSales:order_id')}
          right={
            <Typography py="8px" fontSize={14} color={theme.palette.grey[300]}>
              {record.orderCode}
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
              <Box mb="8px">
                <TextWithIcon text={record.departurePoint} icon={MapPinIcon} color="#1AA6EE" typography={{ fontSize: '14px' }} />
              </Box>
              <TextWithIcon text={record.arrivalPoint} icon={MapPinIcon} color="#1AA6EE" typography={{ fontSize: '14px' }} />
            </>
          }
        />
        <Infomation
          left={t('ticketSales:departureTime')}
          right={
            <Typography py="8px" fontSize={14} color={theme.palette.grey[300]}>
              {dayjs(record.departureTime).format('DD/MM/YYYY - HH[H]mm')}
            </Typography>
          }
        />
        <Infomation
          left={t('ticketSales:paxCount')}
          right={
            <Typography py="8px" fontSize={14} color={theme.palette.grey[300]}>
              {record.totalPax}
            </Typography>
          }
        />
        <Infomation
          left={t('ticketSales:payment_status')}
          right={
            <Tag
              color={PaymentStatusColorMapping[record.paymentStatus]}
              backgroundColor={PaymentStatusBackgroundColorMapping[record.paymentStatus]}
              text={PaymentStatusLabelMapping[record.paymentStatus]}
            />
          }
        />
        <Infomation
          left={t('ticketSales:createdBy')}
          right={
            <Typography py="8px" fontSize={14} color={theme.palette.grey[300]}>
              {UserRoleMappingToLabel[record.rawData.creatorType]}
            </Typography>
          }
        />
        <Infomation
          left={t('ticketSales:cancel_reason')}
          right={
            <Typography py="8px" fontSize={14} color={theme.palette.grey[300]}>
              {record.cancelReason}
            </Typography>
          }
        />
      </Box>
    </Box>
  );
}

export default memo(OrderDetails);
