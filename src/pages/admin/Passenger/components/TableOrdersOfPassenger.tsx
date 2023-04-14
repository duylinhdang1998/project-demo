import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import dayjs from 'dayjs';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { MapPinIcon } from 'assets';
import TextWithIcon from 'components/TextWithIcon/TextWithIcon';
import { TicketSale } from 'services/models/TicketSale';

const useStyles = makeStyles(() => ({
  tableCell: {
    fontSize: '14px',
    color: '#475461',
    borderLeft: '1px solid #f7f7f7',
    borderRight: '1px solid #f7f7f7',
    borderBottom: '1px solid #f7f7f7 !important',
    borderTop: '1px solid #f7f7f7',
  },
}));

interface TableOrdersOfPassengerProps {
  orders: TicketSale[];
}

function TableOrdersOfPassenger({ orders }: TableOrdersOfPassengerProps) {
  const { t } = useTranslation('passenger');
  const classes = useStyles();
  return (
    <Box>
      <TableContainer>
        <Box display="flex" justifyContent="center" alignItems="center" padding="10px 16px" bgcolor="#1AA6EE" borderRadius="4px">
          <Typography color="#fff" fontWeight="bold">
            {t('order_total')}: {orders.length}
          </Typography>
        </Box>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className={classes.tableCell}>{t('trip')}</TableCell>
              <TableCell className={classes.tableCell} align="center">
                {t('date')}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map(({ _id, departurePoint, arrivalPoint, createdAt }) => (
              <TableRow key={_id}>
                <TableCell align="left" className={classes.tableCell}>
                  {[departurePoint, arrivalPoint].map((val, index) => (
                    <TextWithIcon
                      key={index}
                      text={val}
                      icon={MapPinIcon}
                      color="#1AA6EE"
                      typography={{
                        fontSize: '14px',
                      }}
                    />
                  ))}
                </TableCell>
                <TableCell className={classes.tableCell} align="center">
                  {dayjs(createdAt).format('MM/DD/YYYY')}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
export default memo(TableOrdersOfPassenger);
