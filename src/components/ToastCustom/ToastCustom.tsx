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
  box: {
    marginLeft: '10px !important',
  },
  text: {
    color: '#fff',
    fontWeight: 'bold !important',
    fontSize: 16,
    lineHeight: '20px',
  },
  description: {
    color: '#fff',
    fontSize: '13px !important',
  },
}));
interface ToastCustomProps {
  type: 'success' | 'error';
  text: string;
  description?: string;
}

function ToastCustom({ type, text, description }: ToastCustomProps) {
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      {type === 'success' ? (
        <img src={CheckCircleIcon} style={{ width: 22, height: 22 }} />
      ) : (
        <CancelOutlinedIcon sx={{ color: '#fff', fontSize: '18px' }} />
      )}
      <Box className={classes.box}>
        <Typography component="p" className={classes.text}>
          {text}
        </Typography>
        <Typography component="p" className={classes.description}>
          {description}
        </Typography>
      </Box>
    </Box>
  );
}
export default memo(ToastCustom);
