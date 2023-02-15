import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme: Theme) => ({
  label: {
    color: theme.palette.grey[200] + '!important',
    fontSize: '14px !important',
    marginBottom: '4px',
    fontWeight: '400 !important',
    '&.MuiFormControlLabel-label': {
      fontSize: '14px !important',
    },
  },
}));
