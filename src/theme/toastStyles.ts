import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
export const useToastStyle = makeStyles((theme: Theme) => ({
  toastSuccess: {
    backgroundColor: theme.palette.success.light,
  },
  toastError: {
    backgroundColor: theme.palette.error.main,
  },
}));
