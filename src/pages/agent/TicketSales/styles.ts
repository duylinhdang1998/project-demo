import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme: Theme) => ({
  highlightText: {
    color: theme.palette.primary.main,
    fontWeight: 'bold',
    borderWidth: 1,
    backgroundColor: 'transparent',
  },
  title: {
    fontWeight: '400',
    fontSize: 12,
    color: theme.palette.grey[100],
  },
}));
