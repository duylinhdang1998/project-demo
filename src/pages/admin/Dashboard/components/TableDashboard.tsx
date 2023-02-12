import { Table, TableBody, TableCell, TableContainer, TableRow, Theme, useTheme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { MapPinIcon } from 'assets';
import TextWithIcon from 'components/TextWithIcon/TextWithIcon';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { columnsRoutes, routes } from '../constants';

const useStyles = makeStyles((theme: Theme) => ({
  iconBus: {
    width: 48,
    height: 48,
  },
  headerText: {
    fontSize: '14px !important',
    color: theme.palette.grey[700],
  },
  cell: {
    fontSize: '14px !important',
    color: theme.palette.grey[100],
    paddingTop: '8px !important',
    paddingBottom: '8px !important',
  },
}));

function TableDashboard() {
  const classes = useStyles();
  const { t } = useTranslation('dashboard');
  const theme = useTheme();

  return (
    <TableContainer>
      <Table sx={{ minWidth: 650 }}>
        {columnsRoutes.map((c) => (
          <TableCell key={`columns_${c.field}`} sx={{ minWidth: c.width }} className={classes.headerText} align={c.field === 'route' ? 'left' : 'center'}>
            {t(`${c.field}`)}
          </TableCell>
        ))}
        <TableBody>
          {routes.map((row) => {
            return (
              <TableRow key={row.id} sx={{ py: '8px' }}>
                <TableCell className={classes.cell}>
                  {row.routes.map((route, idx) => (
                    <TextWithIcon
                      icon={MapPinIcon}
                      key={idx}
                      text={route}
                      typography={{
                        fontSize: '14px',
                      }}
                      color={theme.palette.secondary.light}
                    />
                  ))}
                </TableCell>
                <TableCell align="center" className={classes.cell}>
                  {row.times}
                </TableCell>
                <TableCell align="center" className={classes.cell}>
                  {row.ECOseats}
                </TableCell>
                <TableCell align="center" className={classes.cell}>
                  {row.VIPseats}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default memo(TableDashboard);
