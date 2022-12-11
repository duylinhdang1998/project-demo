import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { MapPinIcon } from 'assets';
import TextWithIcon from 'components/TextWithIcon/TextWithIcon';
import dayjs from 'dayjs';
import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { v4 as uuid } from 'uuid';

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
const data = [
  { id: uuid(), trip: ['Lyon Gare Perrache', 'Lyon Gare Perrache'], date: new Date() },
  { id: uuid(), trip: ['Lyon Gare Perrache', 'Lyon Gare Perrache'], date: new Date() },
  { id: uuid(), trip: ['Lyon Gare Perrache', 'Lyon Gare Perrache'], date: new Date() },
  { id: uuid(), trip: ['Lyon Gare Perrache', 'Lyon Gare Perrache'], date: new Date() },
];

function TableDetailPassenger() {
  const { t } = useTranslation('passenger');
  const location = useLocation();
  const classes = useStyles();
  return (
    <Box>
      <TableContainer>
        <Box display="flex" justifyContent="center" alignItems="center" padding="10px 16px" bgcolor="#1AA6EE" borderRadius="4px">
          <Typography color="#fff" fontWeight="bold">
            {t('order_total')}: {data.length}
          </Typography>
        </Box>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell className={classes.tableCell}>{t('trip')}</TableCell>
              <TableCell className={classes.tableCell} align="center">
                {t('date')}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row) => (
              <TableRow key={row.id}>
                <TableCell align="left" className={classes.tableCell}>
                  {row.trip.map((val, index) => (
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
                  {dayjs(row.date).format('MM/DD/YYYY')}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
export default memo(TableDetailPassenger);
