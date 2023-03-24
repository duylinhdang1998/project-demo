import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme: Theme) => ({
  btnSubmit: {
    margin: '12px 0 !important',
    height: '48px',
    borderRadius: '4px',
    fontWeight: '700 !important',
    '&:hover': {
      backgroundColor: theme.palette.primary.main + '!important',
    },
  },
  btnCancel: {
    height: '48px',
    borderRadius: '4px',
    color: theme.palette.primary.main + '!important',
    fontWeight: '700 !important',
    '&:hover': {
      backgroundColor: '#fff!important',
    },
  },
  resendOtp: {
    marginTop: '-8px',
  },
}));
