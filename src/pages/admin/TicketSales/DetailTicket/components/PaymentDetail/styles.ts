import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme: Theme) => ({
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
