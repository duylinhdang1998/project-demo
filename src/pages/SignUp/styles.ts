import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
export const useStyles = makeStyles((theme: Theme) => ({
  root: {},
  textWrap: {
    marginBottom: '48px',
  },
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
    margin: 0,
    padding: 0,
  },
  subTitle: {
    margin: '20px 0 !important',
    fontSize: '14px !important',
    fontWeight: '400',
  },
  btnSubmit: {
    margin: '32px 0 !important',
    height: '48px',
    borderRadius: '4px',
    '&:hover': {
      backgroundColor: theme.palette.primary.main + '!important',
    },
    fontWeight: '700 !important',
  },
  checkbox: {
    border: '1px solid #C2C6C9 !important',
    width: 16,
    height: 16,
  },
}));
