import { Divider, Drawer, List, Theme, Toolbar, useTheme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Box } from '@mui/system';
import logoTbus from 'assets/images/logo-tbus.png';
import CustomLink from 'components/CustomLink/CustomLink';
import { useAppSelector } from 'hooks/useAppSelector';
import { Outlet } from 'react-router-dom';
import { selectAuth } from 'store/auth/selectors';
import { sidebars, sidebarsAgent } from './sidebar';

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) => ({
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

export default function Layout() {
  const classes = useStyles();
  const theme = useTheme();
  const { userInfo } = useAppSelector(selectAuth);

  const container = window !== undefined ? () => window.document.body : undefined;
  const drawerContent = userInfo?.role === 'admin' ? sidebars : sidebarsAgent;

  const drawer = (
    <Box>
      <Toolbar>
        <img src={logoTbus} className={classes.img} alt="" />
      </Toolbar>
      <Divider light variant="middle" sx={{ borderColor: '#053A55' }} />
      <List>
        {drawerContent.map((item, index) => (
          <CustomLink item={item} key={item.name} />
        ))}
      </List>
    </Box>
  );

  return (
    <Box display="flex" position="relative" width="100%" bgcolor="#F0F1F3" height="100%">
      <Box
        sx={{
          flexShrink: { tablet: 0 },
          width: { laptop: `${drawerWidth}px` },
        }}
        className="sidebar">
        <Drawer
          container={container}
          variant="temporary"
          open={false}
          onClose={() => {}}
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
          }}>
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
          open>
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
        }}>
        <Outlet />
      </Box>
    </Box>
  );
}
