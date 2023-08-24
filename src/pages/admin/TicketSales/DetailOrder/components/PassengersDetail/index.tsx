import { Divider, Table, TableBody, TableCell, TableContainer, TableRow, Typography, useTheme } from '@mui/material';
import { Box } from '@mui/system';
import { ColumnTicket } from 'pages/admin/TicketSales/components/ColumnTicket';
import { useTranslation } from 'react-i18next';
import { useStyles } from './styles';
import { useCurrency } from 'hooks/useCurrency';

const columnsPassengers = [
  { field: 'lastName', width: 80 },
  { field: 'firstName', width: 80 },
  { field: 'typeTicket', width: 80 },
  { field: 'price', width: 80 },
];

export interface PassengersDetailProps {
  record: ColumnTicket;
}

export const PassengersDetail = ({ record }: PassengersDetailProps) => {
  const theme = useTheme();
  const { t } = useTranslation(['ticketSales']);
  const classes = useStyles();
  const { currencyFormat } = useCurrency();

  return (
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
              align={c.field === 'typeTicket' || c.field === 'price' ? 'center' : 'left'}
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
                  {t(`translation:${passenger.typeTicket}`)}
                </TableCell>
                <TableCell align="center" className={classes.cell}>
                  {currencyFormat(passenger.price)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};
