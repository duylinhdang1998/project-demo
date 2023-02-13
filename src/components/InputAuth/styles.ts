import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme: Theme) => ({
  root: {},
  label: {
    fontWeight: 400,
    fontSize: '14px !important',
    color: theme.palette.grey[100] + '!important',
    marginBottom: '4px',
  },
  input: {
    height: '40px',
    backgroundColor: '#fff',
    padding: '12px 14px',
    borderRadius: '4px',
    border: '1px solid #F4F5F7',
    '&:hover': {
      border: `1px solid ${theme.palette.primary.main}`,
      boxShadow: 'none !important',
    },
    fontSize: '14px !important',
    '&.Mui-error': {
      border: '1px solid' + theme.palette.error.main,
      transition: 'all 0.2s ease',
    },
  },
  iconStartAdor: {
    width: 20,
    height: 20,
  },
  error: {
    marginTop: '4px !important',
    color: theme.palette.error.main,
  },
}));
