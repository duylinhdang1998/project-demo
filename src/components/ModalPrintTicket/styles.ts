import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme: Theme) => {
  return {
    ticketContainer: {
      width: '320px',
      borderRadius: '8px',
      boxShadow: '0px 2px 2px rgba(0, 0, 0, 0.06), 0px 4px 12px rgba(0, 0, 0, 0.08)',
      overflow: 'hidden',
      background: '#fff',
      flexShrink: 0,
      '@media print': {
        margin: '10px auto',
      },
    },
    logo: {
      textAlign: 'center',
      background: theme.palette.primary.main,
      paddingTop: '12px',
      paddingBottom: '12px',
    },
    ticketInfomation: {
      padding: '12px 24px',
    },
    ticketTitle: {
      color: 'rgba(12, 17, 50, 1) !important',
      fontSize: '16px !important',
      fontWeight: '700 !important',
      textAlign: 'center',
      marginBottom: '16px',
    },
  };
});
