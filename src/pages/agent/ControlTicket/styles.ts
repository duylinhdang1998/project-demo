import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme: Theme) => ({
  tableContainer: {
    '& tbody tr:last-child td': {
      borderBottom: 'none !important',
    },
  },
  recordValue: {
    fontSize: '12px !important',
    color: 'rgba(12, 17, 50, 1) !important',
    fontWeight: '500 !important',
  },
  recordTitle: {
    fontSize: '12px !important',
    color: 'rgba(133, 140, 147, 1) !important',
  },
  detailButton: {
    color: theme.palette.primary.main,
    display: 'flex',
    alignItems: 'center',
    fontSize: '12px',
    cursor: 'pointer',
  },
}));
