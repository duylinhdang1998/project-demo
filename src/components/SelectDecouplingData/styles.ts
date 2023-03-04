import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme: Theme) => ({
  label: {
    color: theme.palette.grey[200] + '!important',
    textTransform: 'capitalize',
    fontSize: '14px !important',
    marginBottom: '4px',
    fontWeight: '400 !important',
    '&.MuiFormControlLabel-label': {
      fontSize: '14px !important',
    },
  },
  error: {
    marginTop: '4px !important',
    color: theme.palette.error.main,
  },
  inputError: {
    border: `1px solid ${theme.palette.error.main} !important`,
  },
}));
