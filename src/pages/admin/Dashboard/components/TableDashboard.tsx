import { Table, TableBody, TableCell, TableContainer, TableRow, Theme, useTheme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { MapPinIcon } from 'assets';
import TextWithIcon from 'components/TextWithIcon/TextWithIcon';
import { columnsRoutes } from '../constants';
import { ITrackingRoute } from 'services/Dashboard/dashboard';

interface Props {
  dataSource?: ITrackingRoute[];
}

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

function TableDashboard({ dataSource }: Props) {
  const classes = useStyles();
  const { t } = useTranslation('dashboard');
  const theme = useTheme();

  return (
    <TableContainer>
      <Table sx={{ minWidth: 650 }}>
        {columnsRoutes.map(c => (
          <TableCell
            key={`columns_${c.field}`}
            sx={{ minWidth: c.width }}
            className={classes.headerText}
            align={c.field === 'route' ? 'left' : 'center'}
          >
            {t(`${c.field}`)}
          </TableCell>
        ))}
        <TableBody>
          {dataSource?.map(row => {
            return (
              <TableRow key={row._id} sx={{ py: '8px' }}>
                <TableCell className={classes.cell}>
                  <TextWithIcon
                    icon={MapPinIcon}
                    text={row.route.departurePoint}
                    typography={{
                      fontSize: '14px',
                    }}
                    color={theme.palette.secondary.light}
                  />
                  <TextWithIcon
                    icon={MapPinIcon}
                    text={row.route.stopPoint}
                    typography={{
                      fontSize: '14px',
                    }}
                    color={theme.palette.secondary.light}
                  />
                </TableCell>
                <TableCell align="center" className={classes.cell}>
                  {row.dateTracking}
                </TableCell>
                <TableCell align="center" className={classes.cell}>
                  {row.seatsAvailable?.ECO}
                </TableCell>
                <TableCell align="center" className={classes.cell}>
                  {row.seatsAvailable?.VIP}
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
