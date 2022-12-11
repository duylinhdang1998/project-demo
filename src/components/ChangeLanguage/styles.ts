import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme: Theme) => ({
  imgFlag: {
    width: 24,
    height: 24,
    [theme.breakpoints.down('tablet')]: {
      width: 30,
      height: 30,
    },
  },
  lngText: {
    marginLeft: '8px',
    marginRight: '8px',
    color: theme.palette.grey[300],
    fontSize: 14,
  },
  hiddenText: {
    [theme.breakpoints.down('tablet')]: {
      display: 'none',
    },
  },
  menuList: {
    boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.15)',
    padding: '0px 24px !important',
    borderRadius: '8px',
  },
  menuItem: {
    padding: '16px 0 !important',
  },
  hidden: {
    [theme.breakpoints.up('tablet')]: {
      display: 'none',
    },
  },
}));
