import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme: Theme) => ({
  label: {
    flex: '1 1 40%',
    color: theme.palette.grey[200] + '!important',
    fontSize: '14px !important',
    margin: '4px !important',
    fontWeight: '400 !important',
    '&.MuiFormControlLabel-label': {
      fontSize: '14px !important',
    },
  },
}));
