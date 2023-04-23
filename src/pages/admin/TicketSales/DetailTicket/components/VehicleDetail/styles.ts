import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme: Theme) => {
  return {
    image: {
      width: '40px',
      height: '40px',
      borderRadius: '50%',
      objectFit: 'cover',
      marginRight: '8px',
    },
    name: {
      color: theme.palette.grey[300],
      fontSize: '14px',
    },
    service: {
      width: '12px',
      height: '12px',
      marginRight: '18px',
    },
  };
});
