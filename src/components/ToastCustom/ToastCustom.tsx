import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import { Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Box } from '@mui/system';
import CheckCircleIcon from 'assets/images/check-circle.svg';
import { memo } from 'react';
import './styles.css';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  text: {
    color: '#fff',
    fontWeight: 'bold !important',
    fontSize: 16,
    lineHeight: '20px',
    marginLeft: '10px !important',
  },
}));
interface ToastCustomProps {
  type: 'success' | 'error';
  text: string;
}

function ToastCustom({ type, text }: ToastCustomProps) {
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      {type === 'success' ? (
        <img src={CheckCircleIcon} style={{ width: 22, height: 22 }} />
      ) : (
        <CancelOutlinedIcon sx={{ color: '#fff', fontSize: '18px' }} />
      )}
      <Typography component="span" className={classes.text}>
        {text}
      </Typography>
    </Box>
  );
}
export default memo(ToastCustom);
