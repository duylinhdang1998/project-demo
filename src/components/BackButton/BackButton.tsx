import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { memo } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'components/Button/Button';

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    backgroundColor: theme.palette.primary.main,
    width: 40,
    minWidth: '0 !important',
    height: '40px' + '!important',
    borderRaidus: '4px !important',
    '&:hover': {
      backgroundColor: theme.palette.primary.main + '!important',
    },
  },
}));

function BackButton() {
  const classes = useStyles();
  const navigate = useNavigate();
  const handleBack = () => navigate(-1);
  return (
    <Button variant="contained" className={classes.container} fullWidth={false} onClick={handleBack}>
      <ArrowBackIcon sx={{ color: '#fff', fontSize: '22px' }} />
    </Button>
  );
}

export default memo(BackButton);
