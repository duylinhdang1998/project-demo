import { Box, Grid, Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import logoTbus from 'assets/images/logo-tbus.png';
import ChangeLanguage from 'components/ChangeLanguage/ChangeLanguage';
import { useAppSelector } from 'hooks/useAppSelector';
import { selectAuth } from 'store/auth/selectors';

export const useStyles = makeStyles((theme: Theme) => {
  return {
    root: {},
    itemLeft: {
      backgroundColor: theme.palette.grey['600'],
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100%',
    },
    imgWrapper: {
      textAlign: 'center',
    },
    itemRight: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
      height: '100%',
      position: 'relative',
      padding: '0 16px',
    },
  };
});

export default function AuthLayout() {
  const classes = useStyles();
  const { isLoggedIn, userInfo } = useAppSelector(selectAuth);
  const location = useLocation();

  if (isLoggedIn && userInfo) {
    return <Navigate to={userInfo.role === 'admin' ? '/admin' : '/agent'} />;
  }

  if (location.pathname === '/' || !isLoggedIn) {
    return <Navigate to="/login" />;
  }

  return (
    <Box height="100vh">
      <Grid container height="100%">
        <Grid item xs={12} display={{ xs: 'none', md: 'flex' }} md={6} className={classes.itemLeft}>
          <Box className={classes.imgWrapper}>
            <img src={logoTbus} alt="logo" width="60%" />
          </Box>
        </Grid>
        <Grid item xs={12} md={6} className={classes.itemRight}>
          <Box position="absolute" top="32px" right="32px">
            <ChangeLanguage />
          </Box>
          <Outlet />
        </Grid>
      </Grid>
    </Box>
  );
}
