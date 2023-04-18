import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles(() => ({
  btn: {
    border: '1px solid #1AA6EE',
    borderStyle: 'dashed !important',
    color: '#1AA6EE',
    backgroundColor: 'transparent !important',
    '&:hover': {
      color: '#1AA6EE !important',
    },
    marginTop: '10px !important',
  },
}));
