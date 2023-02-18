import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme: Theme) => ({
  downloadButton: {
    color: theme.palette.primary.main,
    fontSize: 14,
    fontWeight: 500,
    textDecoration: 'underline !important',
  },
}));
