import { Divider, Stack, Table, TableBody, TableCell, TableContainer, TableRow, Typography, useTheme } from '@mui/material';
import { Box } from '@mui/system';
import dayjs from 'dayjs';
import { ColumnTicket } from 'pages/admin/TicketSales/components/ColumnTicket';
import { useTranslation } from 'react-i18next';
import { getAppCurrencySymbol } from 'utils/getAppCurrencySymbol';
import { useStyles } from './styles';

const columnsPassengers = [
  { field: 'lastName', width: 80 },
  { field: 'firstName', width: 80 },
  { field: 'ticket_type', width: 80 },
];

export interface PaymentDetailProps {
  record: ColumnTicket;
}

export const PaymentDetail = ({ record }: PaymentDetailProps) => {
  const theme = useTheme();
  const { t } = useTranslation(['ticketSales']);
  const classes = useStyles();

  return (
    <Stack direction="column" spacing="24px">
      <Box p="24px" bgcolor="#fff" borderRadius="4px">
        <Typography fontSize={16} color={theme.palette.grey[100]} fontWeight="700" pb="24px">
          {t('ticketSales:payment_details')}
        </Typography>
        <Divider sx={{ borderColor: '#D7DADC' }} />
        <Box display="flex" justifyContent="space-between" alignItems="center" pt="24px">
          <Typography fontSize={14} color={theme.palette.grey[300]} fontWeight="400">
            {t('ticketSales:created_on')}
          </Typography>
          <Typography fontSize={14} color={theme.palette.grey[300]} fontWeight="400">
            {dayjs(record.dateTime).format('MM/DD/YYYY - HH:mm')}
          </Typography>
        </Box>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography color={theme.palette.grey[300]} fontWeight="700">
            {t('ticketSales:total')}
          </Typography>
          <Typography fontSize={24} color={'#FF2727'} fontWeight="700">
            {record.rawData.totalPrice}
            {getAppCurrencySymbol()}
          </Typography>
        </Box>
      </Box>
      <Box p="24px" bgcolor="#fff" borderRadius="4px">
        <Typography fontSize={16} color={theme.palette.grey[100]} fontWeight="700" pb="24px">
          {t('ticketSales:passenger_order')}
        </Typography>
        <Divider sx={{ borderColor: '#D7DADC' }} />
        <TableContainer sx={{ paddingTop: '24px' }}>
          <Table>
            {columnsPassengers.map(c => (
              <TableCell
                key={`columns_${c.field}`}
                sx={{ minWidth: c.width }}
                className={classes.headerText}
                align={c.field === 'ticket_type' ? 'center' : 'left'}
              >
                {t(`${c.field}`)}
              </TableCell>
            ))}
            <TableBody>
              {record.rawData.passengers.map(passenger => (
                <TableRow key={passenger.firstName + passenger.lastName} sx={{ py: '8px' }}>
                  <TableCell align="left" className={classes.cell}>
                    {passenger.lastName}
                  </TableCell>
                  <TableCell align="left" className={classes.cell}>
                    {passenger.firstName}
                  </TableCell>
                  <TableCell align="center" className={classes.cell}>
                    {passenger.typeTicket}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Stack>
  );
};
