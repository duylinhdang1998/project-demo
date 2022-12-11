import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme: Theme) => ({
  root: {},
  placeholderWrapper: {
    display: 'flex',
    alignItems: 'center',
  },
  icon: {
    width: 24,
    height: 24,
    marginRight: '5px',
  },
  placeholderText: {
    color: theme.palette.grey[100],
    fontSize: 14,
    fontWeight: 400,
  },
  selectBtn: {
    border: '1px solid #F4F5F7 !important',
    height: '40px',
    borderRadius: '4px !important',
    padding: '5px !important',
  },
  label: {
    fontWeight: 400,
    fontSize: 14,
    color: theme.palette.grey[100],
    marginBottom: '4px',
  },
}));
