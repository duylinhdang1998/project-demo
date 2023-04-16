import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import dayjs from 'dayjs';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { MapPinIcon } from 'assets';
import TextWithIcon from 'components/TextWithIcon/TextWithIcon';
import { TicketSale } from 'services/models/TicketSale';
import classNames from 'classnames';

const useStyles = makeStyles(() => ({
  tableCell: {
    borderLeft: '1px solid rgba(247, 247, 247, 1)',
    borderRight: '1px solid rgba(247, 247, 247, 1)',
    borderBottom: '1px solid rgba(247, 247, 247, 1) !important',
    borderTop: '1px solid rgba(247, 247, 247, 1)',
    fontSize: '14px',
  },
  tableCellTitle: {
    color: 'rgba(133, 140, 147, 1) !important',
  },
  tableCellValue: {
    color: 'rgba(71, 84, 97, 1) !important',
  },
}));

interface TableOrdersOfPassengerProps {
  orders: TicketSale[];
}

function TableOrdersOfPassenger({ orders }: TableOrdersOfPassengerProps) {
  const { t } = useTranslation(['passenger']);
  const classes = useStyles();
  return (
    <Box>
      <TableContainer>
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          padding="10px 16px"
          bgcolor="#1AA6EE"
          sx={{ borderTopLeftRadius: '4px', borderTopRightRadius: '4px' }}
        >
          <Typography color="#fff" fontWeight="bold">
            {t('passenger:order_total')}: {orders.length}
          </Typography>
        </Box>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className={classNames(classes.tableCell, classes.tableCellTitle)}>{t('passenger:trip')}</TableCell>
              <TableCell className={classNames(classes.tableCell, classes.tableCellTitle)} align="center">
                {t('passenger:date')}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map(({ _id, departurePoint, arrivalPoint, createdAt }) => (
              <TableRow key={_id}>
                <TableCell align="left" className={classNames(classes.tableCell, classes.tableCellValue)}>
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
                <TableCell className={classNames(classes.tableCell, classes.tableCellValue)} align="center">
                  {dayjs(createdAt).format('MM/DD/YYYY HH:mm')}
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
