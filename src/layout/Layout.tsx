import { Divider, Drawer, List, Toolbar, useMediaQuery, useTheme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Box } from '@mui/system';
import logoTbus from 'assets/images/logo-tbus.png';
import CustomLink from 'components/CustomLink/CustomLink';
import { LoadingScreen } from 'components/LoadingScreen/LoadingScreen';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { useAppSelector } from 'hooks/useAppSelector';
import { useEffect, useState } from 'react';
import { Link, Navigate, Outlet, useNavigate } from 'react-router-dom';
import { useGetSystemConfig } from 'services/System/config';
import { selectAuth } from 'store/auth/selectors';
import { profileActions } from 'store/profile/profileSlice';
import { selectProfile } from 'store/profile/selectors';
import { UserRole } from 'utils/constant';
import { sidebars, sidebarsAgent } from './sidebar';
import { getDomainName } from 'utils/getDomainName';
import env from 'env';

const drawerWidth = 240;

const useStyles = makeStyles(() => ({
  root: {},
  img: {
    width: 141,
    height: 42,
  },
  subcribe: {
    backgroundColor: 'rgba(51, 204, 127, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '8px 0',
  },
}));
const StaticActionsHandler = {
  toggleMenu: () => {},
};
export default function Layout() {
  const classes = useStyles();
  const theme = useTheme();

  const { userInfo, isLoggedIn } = useAppSelector(selectAuth);
  const { statusGetProfile, profile } = useAppSelector(selectProfile);
  const dispatch = useAppDispatch();

  const [openDrawer, setOpenDrawer] = useState(false);
  const matches = useMediaQuery('(max-width:768px)');

  const { loading } = useGetSystemConfig();
  const navigate = useNavigate();

  const container = window !== undefined ? () => window.document.body : undefined;
  const drawerContent = userInfo?.role === UserRole.ADMIN ? sidebars : sidebarsAgent;
  const rootSidebar =
    env.rootAdmin !== getDomainName()
      ? drawerContent.filter(item => item.name !== 'companies')
      : drawerContent.filter(item => item.name === 'companies');

  useEffect(() => {
    if (isLoggedIn) {
      if (env.rootAdmin && env.rootAdmin !== getDomainName() && location.pathname === '/admin/companies') {
        navigate('/admin', { replace: true });
        return;
      }
      if (env.rootAdmin && env.rootAdmin !== getDomainName()) {
        navigate('/admin/companies', { replace: true });
        return;
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [env.rootAdmin, isLoggedIn]);

  const drawer = (
    <Box>
      <Toolbar>
        <Link to={userInfo?.role === UserRole.ADMIN ? '/admin' : '/agent'}>
          <img src={logoTbus} className={classes.img} alt="" />
        </Link>
      </Toolbar>
      <Divider light variant="middle" sx={{ borderColor: '#053A55' }} />
      <List>
        {rootSidebar.map(item => (
          <CustomLink item={item} key={item.name} />
        ))}
      </List>
    </Box>
  );

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(profileActions.getProfileRequest({}));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedIn]);

  /** Static events */

  useEffect(() => {
    if (!!matches) {
      StaticActionsHandler.toggleMenu = () => {
        setOpenDrawer(state => !state);
      };
    }
  }, [matches]);

  /** <--------------------> */

  if (!isLoggedIn) {
    return <Navigate to="/" />;
  }

  if (loading || !profile?.currency || statusGetProfile === 'idle' || statusGetProfile === 'loading') {
    return (
      <Box height="100vh">
        <LoadingScreen />
      </Box>
    );
  }

  return (
    <Box display="flex" position="relative" width="100%" bgcolor="#F0F1F3" height="100%">
      <Box
        sx={{
          flexShrink: { tablet: 0 },
          width: { laptop: `${drawerWidth}px` },
        }}
        className="sidebar"
      >
        <Drawer
          container={container}
          variant="temporary"
          open={openDrawer}
          onClose={() => {
            setOpenDrawer(false);
          }}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { mobile: 'block', laptop: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
              backgroundColor: theme.palette.grey[600],
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { mobile: 'none', laptop: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
              backgroundColor: theme.palette.grey[600],
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        className="left-content"
        sx={{
          width: '100%',
          position: 'relative',
          minHeight: '100vh',
          backgroundColor: '#F0F1F3',
          overflowX: 'hidden',
          // maxWidth: '100vw',
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
}
