import { Divider, Stack, Table, TableBody, TableCell, TableContainer, TableRow, Theme, Typography, useTheme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Box } from '@mui/system';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';

const columnsPassengers = [
  { field: 'lastName', width: 80 },
  { field: 'firstName', width: 80 },
  { field: 'ticket_type', width: 80 },
];

const data: any[] = [];
for (let i = 0; i < 4; i++) {
  data.push({
    id: i,
    lastName: 'Payoun',
    firstName: 'Samia',
    ticketType: 'ECO',
  });
}

const useStyles = makeStyles((theme: Theme) => ({
  headerText: {
    color: theme.palette.grey[700],
    fontSize: '14px !important',
  },
  cell: {
    fontWeight: '700 !important',
    color: theme.palette.grey[100],
    fontSize: '14px !important',
  },
}));

function PaymentTicket() {
  const theme = useTheme();
  const { t } = useTranslation('ticketSales');
  const classes = useStyles();
  return (
    <Stack direction="column" spacing="24px">
      <Box p="24px" bgcolor="#fff" borderRadius="4px">
        <Typography fontSize={16} color={theme.palette.grey[100]} fontWeight="700" pb="24px">
          {t('payment_details')}
        </Typography>
        <Divider sx={{ borderColor: '#D7DADC' }} />
        <Box display="flex" justifyContent="space-between" alignItems="center" pt="24px">
          <Typography fontSize={14} color={theme.palette.grey[300]} fontWeight="400">
            {t('created_on')}
          </Typography>
          <Typography fontSize={14} color={theme.palette.grey[300]} fontWeight="400">
            02/27/2022 - 10H30
          </Typography>
        </Box>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography color={theme.palette.grey[300]} fontWeight="700">
            {t('total')}
          </Typography>
          <Typography fontSize={24} color={'#FF2727'} fontWeight="700">
            28$
          </Typography>
        </Box>
      </Box>
      <Box p="24px" bgcolor="#fff" borderRadius="4px">
        <Typography fontSize={16} color={theme.palette.grey[100]} fontWeight="700" pb="24px">
          {t('passenger_order')}
        </Typography>
        <Divider sx={{ borderColor: '#D7DADC' }} />
        <TableContainer sx={{ paddingTop: '24px' }}>
          <Table>
            {columnsPassengers.map((c) => (
              <TableCell key={`columns_${c.field}`} sx={{ minWidth: c.width }} className={classes.headerText} align={c.field === 'ticket_type' ? 'center' : 'left'}>
                {t(`${c.field}`)}
              </TableCell>
            ))}
            <TableBody>
              {data.map((row) => (
                <TableRow key={row.id} sx={{ py: '8px' }}>
                  <TableCell align="left" className={classes.cell}>
                    {row.lastName}
                  </TableCell>
                  <TableCell align="left" className={classes.cell}>
                    {row.firstName}
                  </TableCell>
                  <TableCell align="center" className={classes.cell}>
                    {row.ticketType}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Stack>
  );
}

export default memo(PaymentTicket);
