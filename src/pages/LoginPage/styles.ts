import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme: Theme) => ({
  root: {},
  highlightText: {
    color: theme.palette.primary.main,
    fontWeight: 'bold',
    borderWidth: 1,
    backgroundColor: 'transparent',
  },
  title: {
    fontWeight: '400',
    fontSize: 36,
    color: theme.palette.grey[100],
  },
  textWrap: {
    marginBottom: '48px',
  },
  forgotBtn: {
    color: theme.palette.primary.main + '!important',
    fontWeight: '400 !important',
    fontSize: 14,
    margin: '24px 0',
    float: 'right',
  },
  btnSubmit: {
    margin: '32px 0 !important',
    height: '48px',
    fontWeight: '700 !important',
    borderRadius: '4px',
    '&:hover': {
      backgroundColor: theme.palette.primary.main + '!important',
    },
  },
}));
