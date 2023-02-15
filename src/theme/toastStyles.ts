import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';

export const useToastStyle = makeStyles((theme: Theme) => ({
  toastSuccess: {
    color: 'red',
    backgroundColor: `${theme.palette.success.light} !important`,
  },
  toastError: {
    backgroundColor: `${theme.palette.error.main} !important`,
  },
}));
