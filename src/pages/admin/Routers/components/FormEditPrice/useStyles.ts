import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme: Theme) => ({
  cell: {
    width: 'calc(100% / 3)',
    border: '1px solid #F7F7F7 !important',
    padding: '8px 14px !important',
  },
  cellTitle: {
    fontSize: '14px !important',
    color: 'rgba(133, 140, 147, 1) !important',
  },
  input: {
    width: '100% !important',
    '& .ant-input-number-input-wrap input': {
      textAlign: 'center',
      fontWeight: 500,
      fontSize: 14,
      color: 'rgba(12, 17, 50, 1)',
    },
  },
  error: {
    marginTop: '4px !important',
    color: `${theme.palette.error.main} !important`,
  },
}));
